const Owner = 'luoway'
const Project = 'blog'
const token = '5567ddbedd7bc827fc19a718f391853515edbdbb'
    .split('')
    .reverse()
    .join('')
const GithubApi = `https://api.github.com/graphql`
const PageSize = 100
const labelField = 'description' //or 'name'

const request = function(api, params) {
    return new Promise(resolve => {
        const XHR = new XMLHttpRequest()
        XHR.open('POST', api, true)
        XHR.onreadystatechange = () => {
            if (XHR.readyState == 4 && XHR.status == 200) {
                resolve(XHR.responseText)
            }
        }
        XHR.setRequestHeader('Authorization', 'token ' + token)
        XHR.setRequestHeader(
            'Content-Type',
            'application/x-www-form-urlencoded; charset=UTF-8'
        )
        XHR.send(params)
    })
}

const GithubApiFormat = str => {
    return str.replace(/\s+/g, ' ')
}

const JSONParse = json => {
    let rtn
    try {
        rtn = JSON.parse(json)
    } catch (e) {
        return {}
    }

    return rtn
}

const getLabels = labels =>
    labels.nodes.map(node => node[labelField] || node['name'])

export function getIssues(label, last) {
    return request(
        GithubApi,
        JSON.stringify({
            query: GithubApiFormat(`query {
                repository(owner: "${Owner}", name: "${Project}") {
                    issues(
                        orderBy: {
                            field: UPDATED_AT, 
                            direction: DESC
                        }, 
                        labels: ${label ? [label] : null}, 
                        first: ${PageSize},
                        after: ${last ? `"${last.cursor}"` : null}
                    ) {
                        edges {
                            cursor
                            node {
                                number
                                title
                                labels(first: 10) {
                                    nodes {
                                        name
                                        color
                                        description
                                    }
                                }
                                createdAt
                            }
                        }
                    }
                    ${
                        last
                            ? ''
                            : ` labels(first: 100) {
                                    nodes {
                                        name
                                        color
                                        description
                                    }
                                }`
                    }
                }
            }`)
        })
    ).then(res => {
        let issues = []
        let labels = []

        res = JSONParse(res)

        const repository = res && res.data && res.data.repository

        if (repository) {
            if (repository.issues) {
                issues = repository.issues.edges.map(item => {
                    const { number, title, labels, createdAt } = item.node
                    return {
                        cursor: item.cursor,
                        number,
                        title,
                        labels: getLabels(labels),
                        createdTime: new Date(createdAt)
                    }
                })
            }
            if (repository.labels) {
                labels = getLabels(repository.labels)
            }
        }

        return {
            issues,
            labels
        }
    })
}

export function getIssue(number) {
    return request(
        GithubApi,
        JSON.stringify({
            query: `
                query {
                    repository(owner: "luoway", name: "blog") {
                        issue(number: ${number}) {
                            title
                            createdAt
                            labels(first:10){
                                nodes{
                                    name
                                    color
                                    description
                                }
                            }
                            body
                        }
                    }
              }
            `
        })
    ).then(res => {
        res = JSONParse(res)
        const repository = res && res.data && res.data.repository

        if (repository && repository.issue) {
            const { title, createdAt, labels, body } = repository.issue
            return {
                title,
                time: new Date(createdAt),
                labels: getLabels(labels),
                content: body
            }
        }

        return {}
    })
}

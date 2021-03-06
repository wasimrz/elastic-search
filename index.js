/**
 * File: index.js
 * Project: es-client-example
 * File Created: Tuesday, 5th November 2019 10:16:43 pm
 * Author: Jaseem Jas (jaseem@socialanimal.com)
 * -----
 * Last Modified: Tuesday, 5th November 2019 10:53:25 pm
 * Modified By: Jaseem Jas (jaseem@socialanimal.com)
 * -----
 * Copyright 2016 - 2019 Socialanimal.com
 */

const { Client } = require('@elastic/elasticsearch');
const client = new Client({
    cloud: {
        id: "My_deployment:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvJDQzZDAzOTllY2I3YzRkYzVhZDlmMmVjMWNhMTY0ZTRlJDZjMjQ5YzQ5OTYzNTQ1NTZiZDc0Yzc4MzcxYzNiMzhj"
    },
    auth: {
        username: 'elastic',
        password: 'K3GYLcojR1KvErIkSj5FGW9b'
    }
})

async function createTitle() {
    const { response } = await client.create({
        index: 'titles',
        id: 12,
        body: {
            title: 'My Second title',
            author: 'Jaseem',
            date: new Date()
        }
    });
    console.log("run")
    console.log({ response })
}


createTitle().catch((err) => {
    console.log({ err })
});

function deleteDocument(data) {
    client.delete(data, function(err, resp, status) {
        console.log(resp)
    })
}

// async function getTitle() {
//     const { body } = await client.get({
//         index: 'titles',
//         id: 11
//     });

//     console.log(body);
// }

// getTitle().catch(console.log);

// async function updateTitle() {
//     const { response } = await client.update({
//         index: 'titles',
//         id: 11,
//         body: {
//             doc: {
//                 title: 'Awsome title'
//             }
//         }
//     });
// }

// updateTitle().catch(console.log);

const titles = [{
        id: 1,
        title: 'Traditional Marketing Vs Digital Marketing',
        author: 'eCommerce FAQs',
        date: new Date()
    },
    {
        id: 2,
        title: 'Global Digital Marketing Courses Market 2019 Business Strategies ',
        author: 'Coursera',
        date: new Date()
    },
    {
        id: 3,
        title: 'Big Data vs Data Warehouse',
        author: 'Igor',
        date: new Date()
    },
    {
        id: 4,
        title: 'Traditional Marketing Vs Digital Marketing',
        author: 'eCommerce FAQs',
        date: new Date()
    },
    {
        id: 5,
        title: 'Cloudera Data Platform gives big data users multi-cloud path',
        author: 'Erpinnews',
        date: new Date()
    },
    {
        id: 6,
        title: 'IoT Event Blog Affinity IoT',
        author: 'infoMegan Davis',
        date: new Date()
    },
    {
        id: 7,
        title: 'Cloud to cloud backup Solutions Archives',
        author: 'Michael Schneider',
        date: new Date()
    },
    {
        id: 8,
        title: 'Car hire with car insurance',
        author: 'Gary Hunter',
        date: new Date()
    },
    {
        id: 9,
        title: 'Fashion Jobs and Fashion Career Advice',
        author: 'Randy C. Marque',
        date: new Date()
    },
    {
        id: 10,
        title: 'Fashion Designer Zac Posen is Shutting Down his Fashion Label',
        author: 'MARCY OSTER, JTA',
        date: new Date()
    }
];

const body = titles.flatMap((doc, index) => [
    { index: { _index: 'titles', _id: index + 1 } },
    doc
]);

async function createTitles() {
    const { response } = await client.bulk({ body: body, refresh: true });

    if (response) {
        console.log("runn")
        console.log(response.errors);
    }
}

// createTitles().catch((err) => {
//     console.log({ err })
// });

// async function countTitles() {
//     const { body } = await client.count({
//         index: 'titles'
//     });

//     console.log(body);
// }

// countTitles().catch(console.log);
let text = "Fashion"
async function searchTitles() {
    const { body: response } = await client.search({
        index: 'titles',
        body: {
            query: {
                query_string: {
                    query: "*second*",
                    fields: [
                        "title"
                    ]
                }
            }
        }
        // console.log(response.hits.hits);

    })
    console.log(response.hits.hits);
}
searchTitles().catch(console.log);
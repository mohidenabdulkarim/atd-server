const axios = require('axios');
const fastify = require('fastify')({
    logger: true,
})


const apiToken = "Token 5d17ec4b6c4a9d3c2f4b36894660dd14dd837621"
const baseApi = "http://192.168.1.22:8090"

fastify.register(require('fastify-cors'))

// Declare a route
fastify.post('/emp', function (request, reply) {
    const { emp_code, first_name, area, department } = request.body;
    console.log(request.body);
    axios({
        method: 'post',
        url: `${baseApi}/personnel/api/employees/`,
        headers: {
            'Authorization': apiToken,
            'Content-Type': 'application/json',
        },
        data: { "emp_code": emp_code, "first_name": first_name, "area": [2], "department": department }
    }).then(function (response) {
        console.log("EMPLOYEE CREATED")
        reply.send(response.data)
    })
        .catch(function (error) {
            console.log(error);
        });


})



fastify.get('/allEmp', function (request, reply) {
    axios({
        method: 'get',
        url: `${baseApi}/personnel/api/employees/`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': apiToken,
        }
    })
        .then(function (response) {
            reply.send(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

})




fastify.get('/allTrans/:id', function (request, reply) {
    const id = request.params.id;
    axios({
        method: 'get',
        url: `${baseApi}/iclock/api/transactions/?page=${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': apiToken,
        }
    }).then(function (response) {
        const count = response.data.count;
        pages = Math.ceil(count / 10)
        console.log(pages)
        response.data.pages = pages;
        reply.send(response.data)
    })
        .catch(function (error) {
            console.log(error);
        });

})
fastify.get('/emp/:id', function (request, reply) {
    const id = request.params.id;
    axios({
        method: 'get',
        url: `${baseApi}/iclock/api/transactions/?emp_code=${id}`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': apiToken,
        }
    }).then(function (response) {
        reply.send(response.data)
    })
        .catch(function (error) {
            console.log(error);
        });

})



fastify.post('/dep', function (request, reply) {
    const { dept_code, dept_name } = request.body;
    axios({
        method: 'post',
        url: `${baseApi}/personnel/api/departments/`,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': apiToken,
        },
        data: { "dept_code": dept_code, "dept_name": dept_name }
    }).then(function (response) {
        console.log("Created Department!");
        reply.send(response.data)
    })
        .catch(function (error) {
            console.log(error);
        });

})


// Run the server!
fastify.listen(3000, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`server listening on ${address}`)
})
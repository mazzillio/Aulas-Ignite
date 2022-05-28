import express from 'express';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs'
const Port = 3500;
const app = express();
app.use(express.json());
const arquivo = 'src/data.json';

const customers = JSON.parse(fs.readFileSync(arquivo).toString());

const veridyExistsAccountCpf = (req,res,next) => {
    const {cpf}=req.params;
    
    const customer = customers.find(customer => customer.cpf === cpf);
    
    if(!customer){
        return res.status(400).json({
            error:"Customer not found"
        });
    }
    req.customer = customer;
    return next();
}
const getBalance = (statement) =>{
    return statement.reduce((total,operation) =>{
        if(operation.type === "credit")
        return total + operation.amount;
        else return total - operation.amount;
    },0);
}

app.post("/account", (req, res) => {
    const { cpf, name } = req.body;
    const customersAlreadyExists = customers.some((customers) => {
        return customers.cpf === cpf
    });
    if (customersAlreadyExists) {
        return res.status(400).json({
            error: "Customer already exists!"
        });
    }
    customers.push({
        cpf,
        name,
        id: uuid(),
        statement: []
    });
    fs.writeFileSync(arquivo, JSON.stringify(customers));
    return res.status(201).send();
});

app.get("/statement/:cpf", veridyExistsAccountCpf, (req,res) =>{
    const {customer} = req;
    return res.json(customer.statement);
});
app.get("/statement/:cpf/date/", veridyExistsAccountCpf, (req,res) =>{
    const {customer} = req;
    const { date }=req.query;
    const dateFormat = new Date(date + " 00:00");
    const dateStatements = customer.statement.filter( statemet => new Date(statemet.created_at).toDateString() === dateFormat.toDateString());
    return res.json(dateStatements);
});

app.post("/deposit/:cpf", veridyExistsAccountCpf, (req,res) =>{
    const { description, amount } = req.body;
    const { customer } = req;
    const statementOperation ={
        description,
        amount,
        created_at : new Date(),
        type: "credit"
    };
    customers.forEach((customerAt) =>{
        if(customerAt.id === customer.id){
            customerAt.statement.push(statementOperation);
        }
    });
    fs.writeFileSync(arquivo, JSON.stringify(customers));
    return res.status(201).send();
});

app.post("/withdraW/:cpf",veridyExistsAccountCpf, (req,res) => {
    const { amount } = req.body;
    const { customer } = req;
    const balance = getBalance(customer.statement);
    if(balance<amount)
    {
        return res.status(400).json({
            error:"Inufficient funds!"
        });
    }
    const statementOperation ={
        amount,
        created_at : new Date(),
        type: "debit"
    };
    customers.forEach((customerAt) =>{
        if(customerAt.id === customer.id){
            customerAt.statement.push(statementOperation);
        }
    });
    fs.writeFileSync(arquivo, JSON.stringify(customers));
    return res.status(201).send();
});

app.put("/account/:cpf",veridyExistsAccountCpf ,(req,res) => {
    const { name } = req.body;
    const { customer } = req;

    customers.forEach((customerAt) =>{
        if(customerAt.id === customer.id){
            customerAt.name=name;
        }
    });
    fs.writeFileSync(arquivo, JSON.stringify(customers));

    return res.status(201).send();
});

app.get("/account/:cpf", veridyExistsAccountCpf, (req,res) =>{
    const {cpf}=req.params;
    const account = customers.filter(customer => customer.cpf === cpf);
    return res.json(account);
});

app.delete("/account/:cpf", veridyExistsAccountCpf, (req,res) =>{
    const { customer } = req;
    const indexCostumer = costumers.findIndex(costumerIndex => costumerIndex.cpf === costumer.cpf);
    customers.splice(indexCostumer, 1);
    console.log(customers);
    fs.writeFileSync(arquivo, JSON.stringify(customers));
    return res.status(204).send();
});

app.get("/account/:cpf/balance", veridyExistsAccountCpf, (req,res)=>{
    const { customer } = req;
    return res.json({ balance:getBalance(customer.statement) });
});
app.listen(Port, () => {
    console.log(`Server is wake up in: ${Port}`);
});
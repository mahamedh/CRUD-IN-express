const fs= require('fs');
//const path = require('path');
const express = require('express');
const { fail } = require('assert');

const app=express();

app.use(express.json()); // middleware, basically a function which can modify incomming request data



const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
// converting data into javscripit objects

const getAlltours =  (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.lenght, // when u paly with multiple objects
        data: {
            tours  //key and value are one time enough
        }
    });
    
    }

 const getonetour = (req, res) => {
   // console.log(req.params); 
    const id= req.params.id * 1;//in js multiplying number with string converts string in to number
    const tour = tours.find( el=> el.id === id);// find js function find the merge with id parameter.
    
    if (!tour)
    {
       
        return res.status(404).json ({
        status: 'fail',
        message: 'Invalid ID'
       
       });
    }
    res.status(200).json({
            status: 'success',
            data: {
                tours : tour 
            }
        });
     }
        
const createtour =(req, res) => {  //post sending data to client to server this data ideally avilable on req 

    // express does not put body data on request so inorder to data avilable want to use middleware
   
           // console.log(req.body); //body is property of req
              
         const newId= tours[tours.length -1].id +1;
         const newTour = Object.assign({id: newId}, req.body );
   
         tours.push(newTour);
         fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours), err=> {
             res.status(201).json({
   
           status : 'success',
           data : {
              tour: newTour
           }
     });
                 
    });    
   }
   

const updatetour=  (req,res) =>{
    const id=req.params.id * 1;
    const tour = tours.find( el=> el.id === id);
    
        if (!tour)
        {
           
            return res.status(404).json ({
            status: 'fail',
            message: 'Invalid ID'
           
           });
    
        }
    res.status(200).json({
        status: 'success',
         data :{
             tour: '<updated tour>'
               }
        });
    }    

 const deletetour =(req,res) =>{
    const id=req.params.id * 1;
    const tour = tours.find( el=> el.id === id);
    
        if (!tour)
        {
           
            return res.status(404).json ({
            status: 'fail',
            message: 'Invalid ID'
           
           });
    
        }
    res.status(204).json({
        status: 'success',
         data : null
        });
    }
       

app.get('/api/v1/tours', getAlltours);
app.get('/api/v1/tours/:id',getonetour);
app.post('/api/v1/tours',createtour);
app.patch('/api/v1/tours/:id',updatetour);
app.delete('/api/v1/tours/:id',deletetour )

/*app
.route('/api/v1/tours')
.get(getAlltours)
.post(createtour);

app
.route('/api/v1/tours:id')
.get(getonetour)
.patch(updatetour)
.delete(deletetour);
*/
const port= 3000;
app.listen(port, () => {

console.log(`App running on port ${port}....`)

});


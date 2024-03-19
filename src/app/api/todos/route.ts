import { NextRequest, NextResponse } from "next/server";
import { connect  } from "@/dbConfig/db";
import Todo from "@/models/todo";
import {v4} from "uuid";

connect();
export async function GET(request:NextRequest, response:NextResponse) {
    try{
        const todos = await Todo.find({});
        return NextResponse.json({msg:"Found all todos", success:true, todos});
        
    }catch(error){
        return NextResponse.json({msg:"Issue Happened!"});
    }
}

export async function POST(request:NextRequest,response:NextResponse){
    try{
        const reqbody = await request.json();
        const {desc} = reqbody

        const newTodo = new Todo({
            id:v4(),
            desc,
            completed:false
        });

        const savedTodo = await newTodo.save();

        const allTodos = await Todo.find({});

        return NextResponse.json({msg:"Todo is added successfully!", success:true, allTodos});
        
    }catch(error){
        return NextResponse.json({msg:"issue happended"}, {status:500});
    }
}

export async function DELETE(request:NextRequest,response:NextResponse) {
    try{
        await Todo.deleteMany({});

        return NextResponse.json({msg:"Todos cleared", success:true});
    }catch(error){
        return NextResponse.json({msg:"issue happended"}, {status:500});
    }
}
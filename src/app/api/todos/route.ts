import { NextRequest, NextResponse } from "next/server";
import { connect  } from "@/dbConfig/db";
import Todo from "@/models/todo";


connect();
export async function GET(request:NextRequest) {
    try{
         
        console.log('geeeeeee')
        return [1,2]
        // const todos = await Todo.find({});
    }catch(error){
        return NextResponse.json({msg:"Issue Happened!"});
    }
}

export async function POST(request:NextRequest){
    try{
        console.log('ssssssssss')
        // const reqbody = await request.json();
        // const {desc} = reqbody

        // const newTodo = new Todo({
        //     id:v4(),
        //     desc,
        //     completed:false
        // });

        // const savedTodo = await newTodo.save();
        
    }catch(error){
        return NextResponse.json({msg:"issue happended"}, {status:500});
    }
}
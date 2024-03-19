import { NextRequest, NextResponse } from "next/server";
import { connect  } from "@/dbConfig/db";
import Todo from "@/models/todo";
import {v4} from "uuid";
import { FUNCTIONS_CONFIG_MANIFEST } from "next/dist/shared/lib/constants";




connect();

function getIdFromPathname(s:string){
    let parts = s.split("/");

    return parts[parts.length -1];
}
export async function GET(request:NextRequest, response:NextResponse) {
    try{
        const path = request.nextUrl.pathname;
        const id = getIdFromPathname(path);

        const todo = await Todo.findOne({id});
        return NextResponse.json({msg:"Found all todos", success:true, todo});
        
    }catch(error){
        return NextResponse.json({msg:"Issue Happened!"});
    }
}

export async function DELETE(request:NextRequest){
    try{
        const path = request.nextUrl.pathname;
        const id = getIdFromPathname(path);

        await Todo.deleteOne({id});

        const allTodos = await Todo.find({});
        
        return NextResponse.json({msg:"Todo is deleted successfully!", success:true, allTodos});
        
    }catch(error){
        return NextResponse.json({msg:"Issue Happened!"});
    }
}

export async function PUT(request:NextRequest, response:NextResponse){
    try{
        const path = request.nextUrl.pathname;
        const id = getIdFromPathname(path);

        const reqbody = await request.json();
        
        const {desc, completed} = reqbody;
        
        const update = await Todo.updateOne({id}, {desc, completed}); 

        const allTodos = await Todo.find({});
        
        return NextResponse.json({msg:"Todo is updated successfully!", success:true, allTodos});
        
    }catch(error){
        return NextResponse.json({msg:"Issue Happened!"});
    }
}

 
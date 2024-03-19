import { NextRequest, NextResponse } from "next/server";
import { connect  } from "@/dbConfig/db";
import Todo from "@/models/todo";
import {v4} from "uuid";

connect();

export async function POST(request: NextRequest, res: NextResponse) {
    
    try {
      const reqbody = await request.json();
      const {id, completed} = reqbody;
        
      const update = await Todo.updateOne({id}, {completed}); 

      const allTodos = await Todo.find({});
      return NextResponse.json({msg:"Status is updated successfully!",success:true, allTodos});

    } catch (error) {
      return NextResponse.json({msg:"Issue Happened!"});
    }
  }
<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Validator;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
     // all clients
   
    public function index(Request $request)
    {
        $search = $request->params;

        foreach($search as $searchs){
             $seh = $searchs;
        }
      

      $student = Student::where(function($q) use ($seh) {
        $q->where('email', 'like', "%$seh%");
           

    })->orderBy('created_at', 'desc')->paginate(5);
        return response($student, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    
    public function add(Request $request)
    {
 
      $student = new Student();
      $student->password= $request->password;
      $student->email = $request->email;
      $student->save();

     return response()->json(['status'=>'success','data'=>$student]);


    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\client  $client
     * @return \Illuminate\Http\Response
     */
    public function delete($id){

        $student = Student::where('id', $id)->delete();
        return response()->json(['status'=>'success','data'=>$student]);
     }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\client  $client
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
       $student = Student::where('id',$id)->first();
       $student->password = $request->password;
       $student->email = $request->email;
      $student->save();

      return response()->json(['status'=>'success','data'=>$student]);
    }

    
}

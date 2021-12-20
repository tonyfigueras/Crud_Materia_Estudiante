<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;
use Validator;

class LessonController extends Controller
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
      

      $lessons = Lesson::where(function($q) use ($seh) {
        $q->where('name', 'like', "%$seh%");
           

    })->orderBy('created_at', 'desc')->paginate(5);
        return response($lessons, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    
    public function add(Request $request)
    {
 
      $lesson = new Lesson();
      $lesson->name = $request->nombre;
      $lesson->save();

     return response()->json(['status'=>'success','data'=>$lesson]);


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

        $lesson = Lesson::where('id', $id)->delete();
        return response()->json(['status'=>'success','data'=>$lesson]);
     }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\client  $client
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
       $lesson = Lesson::where('id',$id)->first();
       $lesson->name = $request->nombre;
      $lesson->save();

      return response()->json(['status'=>'success','data'=>$lesson]);
    }

    
}

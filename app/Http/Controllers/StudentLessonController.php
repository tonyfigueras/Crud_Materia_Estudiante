<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Lesson;
use App\Models\StudentLesson;
use Illuminate\Http\Request;
use Validator;

class StudentLessonController extends Controller
{
    public function getlesson()
    {
        $data = Lesson::get();
        return response()->json($data);
    }

    public function getstudent()
    {
        $data = Student::get();
        return response()->json($data);
    }
    
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    
      
    public function index(Request $request)
    {
        $search = $request->params;

        foreach($search as $searchs){
             $seh = $searchs;
        }

        $student_lesson = StudentLesson::
        with(['student' => function ($q) use($seh) {
              $q->where('email', 'like', "%$seh%");
        },'lesson' => function ($q) use($seh) {
              $q->where('name', 'like', "%$seh%");
        }])->orderBy('created_at', 'desc')->paginate(5);

        return response()->json(['data'=>$student_lesson]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    
    public function add(Request $request)
    {
       
      $StudentLesson = new StudentLesson();
      $StudentLesson->student_id= $request->id_student;
      $StudentLesson->lesson_id = $request->id_lesson;
      $StudentLesson->save();

     return response()->json(['status'=>'success','data'=>$StudentLesson]);


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

        $StudentLesson = StudentLesson::where('id', $id)->delete();
        return response()->json(['status'=>'success','data'=>$StudentLesson]);
     }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\client  $client
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
       $StudentLesson = StudentLesson::where('id',$id)->first();
       $StudentLesson->student_id= $request->id_student;
      $StudentLesson->lesson_id = $request->id_lesson;
      $StudentLesson->save();

      return response()->json(['status'=>'success','data'=>$StudentLesson]);
    }

    
}

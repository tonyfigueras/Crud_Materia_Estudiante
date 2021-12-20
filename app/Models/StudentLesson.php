<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentLesson extends Model
{
    use HasFactory;

    protected $table = 'student_lesson';
    protected $fillable= [
         'student_id','lesson_id',
       
    ];

    public function student(){

        return $this->belongsTo('App\Models\Student');
        //return $this->belongsTo('App\Models\Student'::class, 'student_id');
      }
      public function lesson(){
    
        return $this->belongsTo('App\Models\Lesson');
       // return $this->belongsTo('App\Models\Lesson'::class, 'lesson_id');
      }
}

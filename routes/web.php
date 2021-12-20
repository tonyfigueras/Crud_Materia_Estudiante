<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('{path}','App\Http\Controllers\HomeController@index')->where( 'path' , '([A-z\d\-\/_.]+)?' );
Route::post('alllesson', 'App\Http\Controllers\LessonController@index');
Route::post('addlesson', 'App\Http\Controllers\LessonController@add');
Route::post('editlesson/{id}', 'App\Http\Controllers\LessonController@edit');
Route::delete('deletelesson/{id}', 'App\Http\Controllers\LessonController@delete');

Route::post('allstudent', 'App\Http\Controllers\StudentController@index');
Route::post('addstudent', 'App\Http\Controllers\StudentController@add');
Route::post('editstudent/{id}', 'App\Http\Controllers\StudentController@edit');
Route::delete('deletestudent/{id}', 'App\Http\Controllers\StudentController@delete');

Route::post('allstudent_lesson', 'App\Http\Controllers\StudentLessonController@index');
Route::post('addstudentlesson', 'App\Http\Controllers\StudentLessonController@add');
Route::post('editstudentlesson/{id}', 'App\Http\Controllers\StudentLessonController@edit');
Route::delete('deletestudentlesson/{id}', 'App\Http\Controllers\StudentLessonController@delete');

Route::post('get_lesson', 'App\Http\Controllers\StudentLessonController@getlesson');
Route::post('get_student', 'App\Http\Controllers\StudentLessonController@getstudent');
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::get('/students', 'App\Http\Controllers\api\StudentController@index');
Route::get('/students/category/{category}', 'App\Http\Controllers\api\StudentController@showRef');
Route::get('/students/report/{category}', 'App\Http\Controllers\api\StudentController@showRaw');
Route::post('/students', 'App\Http\Controllers\api\StudentController@store');
Route::get('/students/{id}', 'App\Http\Controllers\api\StudentController@show');
Route::patch('/students/{id}', 'App\Http\Controllers\api\StudentController@update');
<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Students;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $showAll = Students::all();
        return response()->json([
            'data' => $showAll
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->validate($request,[
            'firstName' => 'required',
            'middleName' => 'required',
            'lastName' => 'required',
            'birthday' => 'required',
            'studentID' => 'required',
            'parentFirstName' => 'required',
            'parentMiddleName' => 'required',
            'parentLastName' => 'required',
            'email' => 'required',
            'contactNum' => 'required',
            'relationship' => 'required'
        ]);

        $student = new Students;
        $student->firstName = $request->firstName;
        $student->middleName = $request->middleName;
        $student->lastName = $request->lastName;
        $student->birthday = $request->birthday;
        $student->studentID = $request->studentID;
        $student->parentFirstName = $request->parentFirstName;
        $student->parentMiddleName = $request->parentMiddleName;
        $student->parentLastName = $request->parentLastName;
        $student->email = $request->email;
        $student->contactNum = $request->contactNum;
        $student->relationship = $request->relationship;
        $student->save();

        return response()->json([
            'message' => 'student created'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function showRef($category)
    {
        $model = [];
        if ($category != 'all') {
            $model = Students::where('status', $category)->get();
        } else {
            $model = Students::all();
        }

        if (is_null($model)) {
            return response()->json([
                'data' => 'Not found'
            ],404);
        }
        else {
            return response()->json([
                'data' => $model
            ],200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $model = Students::find($id);

        if (is_null($model)) {
            return response()->json([
                'data' => 'Not found'
            ],404);
        }
        else {
            return response()->json([
                'data' => $model
            ],200);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = [
            'firstName' => $request->firstName,
            'middleName' => $request->middleName,
            'lastName' => $request->lastName,
            'birthday' => $request->birthday,
            'studentID' => $request->studentID,
            'parentFirstName' => $request->parentFirstName,
            'parentMiddleName' => $request->parentMiddleName,
            'parentLastName' => $request->parentLastName,
            'email' => $request->email,
            'contactNum' => $request->contactNum,
            'relationship' => $request->relationship,
            'status' => $request->status
        ];

        $res = Students::where('id', $id)->first();
        
        if (is_null($res)) {
            return response()->json([
                'message' => 'Not found'
            ],404);
        }

        $res->update($data);

        return response()->json([
            'message' => 'student updated',
            'data' => $res
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Students $students)
    {
        //
    }
}

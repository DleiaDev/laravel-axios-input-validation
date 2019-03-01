<?php

use Illuminate\Http\Request;

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

// Update profile route
Route::post('/update', function(Request $request) {
    $id = auth()->user()->id;

    // Validate input
    $validator = Validator::make($request->all(), [
      'full_name' => 'required|string|max:30',
      'email' => "required|string|email|max:30|unique:users,email,$id",
      'nickname' => "max:30|unique:users,nickname,$id",
      'country' => 'max:160',
      'city' => 'max:160',
      'description' => 'max:160'
    ]);
    if ($validator->fails()) {
      return response([
        'errors' => $validator->errors()
      ]);
    }

    // Update the user
    $user = auth()->user();
    $user->fill([
      'full_name' => $request->full_name,
      'email' => $request->email,
      'nickname' => $request->nickname,
      'description' => $request->description,
      'country' => $request->country,
      'city' => $request->city
    ]);
    $user->save();

    // Return
    return response(['success' => true]);

});

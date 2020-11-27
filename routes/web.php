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
  return view('app');
});
Route::get('/transaction', function () {
  return view('app');
});

Route::prefix('api')->group(function () {
  Route::get('transactions', 'App\Http\Controllers\TransactionsController@index')->name('transactions.index');
  Route::post('transactions', 'App\Http\Controllers\TransactionsController@store')->name('transactions.store');
  Route::get('transactions/create', 'App\Http\Controllers\TransactionsController@create')->name('transactions.create');
  Route::put('transactions/{transaction}', 'App\Http\Controllers\TransactionsController@update')->name('transactions.update');
  Route::get('transactions/{transaction}/edit', 'App\Http\Controllers\TransactionsController@edit')->name('transactions.edit');
});

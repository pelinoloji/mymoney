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

Route::prefix('api')->group(function () {
  Route::get('transactions', 'App\Http\Controllers\TransactionsController@index')->name('transactions.index');
  Route::post('transactions', 'App\Http\Controllers\TransactionsController@store')->name('transactions.store');
  Route::put('transactions/{transactionID}/edit', 'App\Http\Controllers\TransactionsController@edit')->name('transactions.edit');
});

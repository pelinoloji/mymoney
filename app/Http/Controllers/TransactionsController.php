<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transactions;

class TransactionsController extends Controller
{
  public function index(Transactions $transactions)
  {
    $transactions = Transactions::all();
    return response()->json($transactions);
  }
}

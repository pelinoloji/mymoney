<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Currency;
use App\Models\Tag;

class TransactionsController extends Controller
{

  public function index(Transaction $transaction)
  {
    $transaction = Transaction::orderByDesc('id')
      ->with('currency', 'tag')
      ->get();

    $getTotal = Transaction::groupBy('currency_id')
      ->selectRaw('sum(amount) as sum, currencies.name')
      ->join('currencies', 'currencies.id', '=', 'transactions.currency_id')
      ->get();

    $getCurrencies = Currency::all();
    $getTags = Tag::all();

    // if (request('tag')) {
    //   $transaction = Tag::where('name', request('tag'))->firstOrFail()->transaction;
    // } else {
    //   $transaction = Transaction::latest()->get();
    // }
    // return response()->json('kisfmet');

    return response()->json(
      [
        'transactions' => $transaction,
        'total' => $getTotal,
        'currencies' => $getCurrencies,
        'tags' => $getTags
      ]
    );
  }


  public function store(Request $request)
  {
    $this->validateTransactions();
    $transaction = new Transaction();
    $transaction->currency_id = $request->get('currency_id');
    $transaction->amount = $request->get('amount');
    $transaction->expense = $request->get('expense');
    $transaction->recurrence = $request->get('recurrence');
    $transaction->date = $request->get('transaction_date');

    $transaction->save();

    $transaction->tag()->attach(request('tags'));

    dd($transaction);

    return response()->json($transaction, 'Successfully added');
  }


  public function update($id, Request $request)
  {
    $transaction = Transaction::find($id);
    $transaction->currency_id = $request->get('currency_id');
    $transaction->amount = $request->get('amount');
    $transaction->expense = $request->get('expense');
    $transaction->recurrence = $request->get('recurrence');
    $transaction->date = $request->get('transaction_date');

    $transaction->save();

    return response()->json('Successfully Updated', $transaction);
  }


  public function edit($id)
  {
    $transaction = Transaction::find($id);
    return response()->json($transaction, 'Successfully edited');
  }


  public function destroy($id)
  {
    $transaction = Transaction::findOrFail($id)->delete();
    return response()->json('Successfully Deleted', $transaction);
  }


  public function validateTransactions()
  {
    return request()->validate([
      'amount' => 'required',
      'tag_id' => 'required',
      'currency_id' => 'required',
      'transaction_date' => 'required',
      // 'recurrence' => "required"
    ]);
  }
}

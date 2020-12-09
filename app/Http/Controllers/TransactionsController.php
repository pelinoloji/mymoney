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


    // $month = Transaction::groupBy('date')->get();
    // $date = date('F', strtotime($month));

    // dd($date);

    // $tagName = Transaction::join('tags', 'tags.id', '=', 'transactions.tag_id')
    //   ->select('tags.*', 'tags.name')
    //   ->get(); //??

    // $tagList = Transaction::where('tags')->get();

    // dd($tagList);


    return response()->json(
      [
        'transactions' => $transaction,
        'total' => $getTotal,
        // 'tagName' => $tagName,
        // 'currencyList' => $currencyList
      ]
    );
  }

  public function update($id, Request $request)
  {
    $transaction = Transaction::find($id);

    $transaction->amount = $request->get('amount');
    $transaction->tag_id = $request->get('tag');
    $transaction->currency_id = $request->get('currency_id)');
    $transaction->expense = $request->get('expense');
    $transaction->date = $request->get('transaction_date');
    $transaction->save();

    return response()->json('Successfully Updated');
  }

  public function edit($id)
  {
    $transaction = Transaction::find($id);
    return response()->json($transaction);
  }

  public function store(Request $request)
  {
    $this->validateTransactions();
    $transaction = new Transaction();
    $transaction->amount = $request->get('amount');
    $transaction->tag_id = $request->get('tag');
    $transaction->currency_id = $request->get('currency_id');
    $transaction->expense = $request->get('expense');
    $transaction->date = $request->get('transaction_date');

    $transaction->save();
    $transaction->tag_id = 1;
    $transaction->currency_id = 1;
    $transaction->tag()->attach(request('tag'));
    return response()->json('Successfully added');
  }


  public function destroy($id)
  {
    $transaction = Transaction::findOrFail($id)->delete();
    return response()->json('Successfully Deleted');
  }

  public function validateTransactions()
  {
    return request()->validate([
      'amount' => 'required',
      // 'tag' => 'required',
      // 'currency' => 'required',
      'expense' => 'required',
      // 'date' => 'required'
    ]);
  }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tag;


class TagController extends Controller
{

  // public function index(Tag $tag)
  // {
  //   $tag = Tag::all();
  //   dd($tag, 'index in tag controller');
  // }


  public function store(Request $request)
  {
    $tag = new Tag();
    $tag->name = $request->get('name');
    $tag->save();
    return response()->json($tag->id);
  }
}

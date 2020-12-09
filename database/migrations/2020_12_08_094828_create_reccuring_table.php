<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReccuringTable extends Migration
{
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up()
  {
    Schema::create('reccuring', function (Blueprint $table) {
      $table->id();
      $table->string('name')->unique();
      $table->unsignedBigInteger('tag_id');
      $table->date('start_date');
      $table->date('end_date');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down()
  {
    Schema::dropIfExists('reccuring');
  }
}

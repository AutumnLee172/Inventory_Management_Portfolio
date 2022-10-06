<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('customer_id');
            $table->string('customer_name')->nullable();
            $table->string('phone_number')->nullable();
            $table->string('address')->nullable();
            $table->string('remark')->nullable();
            $table->float('total');
            $table->float('discount');
            $table->float('net');
            $table->float('deposit');
            $table->float('balance');
            $table->float('tax')->nullable();
            $table->string('transaction_id');
            $table->string('status')->nullable();
            $table->string('created_date')->nullable();
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
        Schema::dropIfExists('invoices');
    }
}

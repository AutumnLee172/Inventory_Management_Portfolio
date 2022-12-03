
<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="@stack('html-class')">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{{ config('app.name', 'Report') }}</title>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ mix($stylesheet ?? 'css/app.css') }}" rel="stylesheet">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">

    <!--     Fonts and icons     -->
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />

    <!-- CSS Files -->
    <link href="css/argon-dashboard.css?v=2.0.4" rel="stylesheet" />
    <script src="{{ mix('js/app.js') }}" defer></script>
    <style>
        .center{
            text-align: center;
            margin: auto;
            padding: 5px;
        }
        .leftside{
            text-align: left;
        }
        .in-line{
            display: inline;
        }
        .righthandside{
            float: right;
            clear: both;
        }
        .blockhalf{
            width: 50%;
        }
        .border {
            border: 1px solid;
            padding: 5px;
        }

        .border-table {
            width: 100%;
            border-collapse: collapse;
        }

        .borderless{
            width: 20%;
            margin-bottom: 10px;
        }

        .footer {
        position: fixed;
        left: 0;
        bottom: 70px;
        width: 100%;
        text-align: left;
        }
        
        h3, h5 {
            margin-top: 5px;
            margin-bottom: 5px;
        }

        td{
            font-size: 15px;
        }

    </style>

</head>
<body>
    <div>
            <h2 class="center"> JAC LIGHT ENTERPRISE (IP0530129-W)</h2>
            <h5 class="center"> 11-13, Jalan Yang Kalsam, 30250 Ipoh Perak (H/P: 0164124187) </h5>

            <hr/>

                <h3> {{ $items[0]->transaction_type }} </h3>
                <h5 class="righthandside">{{ $data->created_date }} </h5>
                <h5>No: {{ $data->transaction_id }}</h5>
                <h5>Customer Name: {{ $data->customer_name }} </h5>
                @if ( $items[0]->transaction_type !== "Cash Sale" )                
                <h5>Phone Number: {{ $data->phone_number }} </h5>
                <h5 class="blockhalf">Address: {{ $data->address }} </h5>
                <h5>Remark: {{ $data->remark }} </h5>
                @endif

            <hr/>
            <br/>

            <table class="border-table">
                <tr class="border">
                <th class="border">No</th>
                  <th class="border">Item Number</th>
                  <th class="border">Description</th>
                  <th class="border">Price (RM)</th>
                  <th class="border">Qty</th>
                  <th class="border">Amount</th>
                </tr>
                @foreach ($items as $item)
                <tr>
                    <td style="text-align: center;">{{ $loop->index + 1 }}</td>
                    <td>{{ $item->item_number }}</td>
                    <td>{{ $item->description }}</td>
                    <td style="text-align: right;">{{ number_format($item->selling_price, 2, '.', ',') }}</td>
                    <td style="text-align: right;">{{ $item->quantity }}</td>
                    <td style="text-align: right;">{{ number_format($item->sub_total, 2, '.', ',') }}</td>
                </tr>
            @endforeach
              </table>
              <br/>
              @if ( $items[0]->transaction_type !== "Cash Sale" )
              <div class="footer">
                <hr/>
              <table class="borderless righthandside">
                <tr>
                <td style="text-align: right;">Total:</td> <td style="text-align: right;">RM{{ number_format($data->total, 2, '.', ',') }}</td>
                </tr>
                <tr>
                <td style="text-align: right;">Discount:</td> <td style="text-align: right;">RM{{ number_format($data->discount, 2, '.', ',') }}</td>
                </tr>
                <tr>
                <td style="text-align: right;">Net:</td> <td style="text-align: right;">RM{{ number_format($data->net, 2, '.', ',') }}</td>
                </tr>
                <tr>
                <td style="text-align: right;">Deposit:</td> <td style="text-align: right;">RM{{ number_format($data->deposit, 2, '.', ',') }}</td>
                </tr>
                <tr>
                <td style="text-align: right;">Balance:</td> <td style="text-align: right;">RM{{ number_format($data->balance, 2, '.', ',') }}</td>
                </tr>
              </table>
            </div>
              @else
              <hr/>
              <table class="borderless righthandside">
                <tr>
                <td style="text-align: right;">Total:</td> <td style="text-align: right;">RM{{ number_format($data->total, 2, '.', ',') }}</td>
                </tr>
              </table>
              
              @endif
    </div>

</body>
</html>

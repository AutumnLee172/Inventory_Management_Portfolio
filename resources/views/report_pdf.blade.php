
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
            width: 50%;
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
        bottom: 0;
        width: 100%;
        text-align: left;
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
                <h5>Transaction ID: {{ $data->transaction_id }}</h5>
                <h5>Customer Name: {{ $data->customer_name }} </h5>
                <h5>Phone Number: {{ $data->phone_number }} </h5>
                <h5 class="blockhalf">Address: {{ $data->address }} </h5>
                <h5>Remark: {{ $data->remark }} </h5>


            <hr/>
            <br/>

            <table class="border-table border">
                <tr class="border">
                  <th class="border">Item Number</th>
                  <th class="border">Description</th>
                  <th class="border">Price</th>
                  <th class="border">Quantity</th>
                  <th class="border">Sub total</th>
                </tr>
                @foreach ($items as $item)
                <tr class="border">
                    <td class="border">{{ $item->item_number }}</td>
                    <td class="border">{{ $item->description }}</td>
                    <td class="border" style="text-align: center;">RM {{ $item->selling_price }}</td>
                    <td class="border" style="text-align: center;">{{ $item->quantity }}</td>
                    <td class="border" style="text-align: center;">RM {{ $item->sub_total }}</td>
                </tr>
            @endforeach
              </table>
              <br/>
              <table class="borderless righthandside">
                <tr>
                <td style="text-align: right;">Total:</td> <td style="text-align: right;">RM{{ $data->total }}</td>
                </tr>
                <tr>
                <td style="text-align: right;">Discount:</td> <td style="text-align: right;">RM{{ $data->discount }}</td>
                </tr>
                <tr>
                <td style="text-align: right;">Net:</td> <td style="text-align: right;">RM{{ $data->net }}</td>
                </tr>
                <tr>
                <td style="text-align: right;">Deposit:</td> <td style="text-align: right;">RM{{ $data->deposit }}</td>
                </tr>
                <tr>
                <td style="text-align: right;">Balance:</td> <td style="text-align: right;">RM{{ $data->balance }}</td>
                </tr>
              </table>
            <div class="footer">For more information, please contact +60164124187</div>

    </div>

</body>
</html>

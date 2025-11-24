<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${campaign.subject}</title>

    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f6f7fb;
            font-family: 'Helvetica Neue', Arial, sans-serif;
        }
        .container {
            max-width: 620px;
            background: #ffffff;
            margin: 32px auto;
            padding: 32px;
            border-radius: 12px;
            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
        }
        h2 {
            color: #333333;
            font-weight: 600;
            margin-bottom: 8px;
        }
        .subject {
            color: #3454d1;
            font-size: 20px;
            margin: 20px 0 10px 0;
            font-weight: 600;
        }
        p {
            color: #555555;
            line-height: 1.6;
            font-size: 15px;
        }
        .footer {
            margin-top: 36px;
            font-size: 12px;
            color: #aaaaaa;
            text-align: center;
        }
        .button {
            display: inline-block;
            background-color: #3454d1;
            color: #ffffff !important;
            padding: 14px 24px;
            border-radius: 6px;
            margin-top: 20px;
            text-decoration: none;
            font-size: 15px;
            font-weight: 500;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>Hello ${user.firstName} ${user.lastName},</h2>
    <p>
        We’re excited to share our latest campaign with you.
    </p>
    <div class="subject">${campaign.subject}</div>
    <p>
        ${campaign.content}
    </p>
    <p>
        If you have any questions or would like more details, feel free to reach out to us anytime.
    </p>
    <div class="footer">
        This email was sent to <strong>${user.email}</strong>.<br/>
        If you no longer wish to receive campaign emails, you can update your preferences in your account.
    </div>
</div>

</body>
</html>

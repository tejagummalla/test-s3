
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from email.mime.multipart import MIMEMultipart

import boto

# via http://codeadict.wordpress.com/2010/02/11/send-e-mails-with-attachment-in-python/
msg = MIMEMultipart()
msg['Subject'] = 'pdf filled form'
msg['From'] = 'shashank@nyllab.com'
msg['To'] = 'eswara@nyllabs.tech'

# what a recipient sees if they don't use an email reader
msg.preamble = 'Multipart message.\n'

# the message body
part = MIMEText('Hello -- Here is your pre-filled form.')
msg.attach(part)

# the attachment
part = MIMEApplication(open('test123.pdf', 'rb').read())
part.add_header('Content-Disposition', 'attachment', filename='test123.pdf')
msg.attach(part)

# connect to SES
connection = boto.connect_ses(aws_access_key_id='AKIAJSK2Y7B6KBEFUZMA'
    , aws_secret_access_key='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')

# and send the message
result = connection.send_raw_email(msg.as_string()
    , source=msg['From']
    , destinations=[msg['To']])
print result

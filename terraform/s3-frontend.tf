resource "aws_s3_bucket" "frontend_bucket" {
  bucket = "my-react-frontend-bucket-${random_id.suffix.hex}"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = {
    Name = "React Frontend Bucket"
  }
}

resource "aws_s3_bucket_policy" "frontend_policy" {
  bucket = aws_s3_bucket.frontend_bucket.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Sid       = "PublicReadGetObject",
      Effect    = "Allow",
      Principal = "*",
      Action    = ["s3:GetObject"],
      Resource  = ["${aws_s3_bucket.frontend_bucket.arn}/*"]
    }]
  })
}

resource "random_id" "suffix" {
  byte_length = 3
}

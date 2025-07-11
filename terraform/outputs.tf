output "frontend_bucket_name" {
  value = aws_s3_bucket.frontend_bucket.bucket
}

output "frontend_website_url" {
  value = aws_s3_bucket.frontend_bucket.website_endpoint
}

output "backend_ec2_public_ip" {
  value = aws_instance.fastapi_ec2.public_ip
}

output "cloudflare_frontend_dns" {
  value = cloudflare_record.frontend.name
}

output "cloudflare_backend_dns" {
  value = cloudflare_record.backend.name
}

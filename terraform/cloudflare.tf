data "cloudflare_zones" "zone" {
  filter {
    name   = var.domain_name
    status = "active"
  }
}

resource "cloudflare_record" "frontend" {
  zone_id = data.cloudflare_zones.zone.zones[0].id
  name    = "www"
  value   = aws_s3_bucket.frontend_bucket.bucket_regional_domain_name
  type    = "CNAME"
  proxied = true
}

resource "cloudflare_record" "backend" {
  zone_id = data.cloudflare_zones.zone.zones[0].id
  name    = "api"
  value   = aws_instance.fastapi_ec2.public_ip
  type    = "A"
  proxied = true
}
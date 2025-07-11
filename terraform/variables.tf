variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "domain_name" {
  type        = string
  description = "Your root domain name"
  default     = "joelhutchinson.com"
}

variable "allowed_ssh_cidr" {
  type        = string
  description = "CIDR block allowed to SSH into EC2"
  default = "0.0.0.0/32"
}

variable "ec2_key_pair" {
  type        = string
  description = "AWS key pair name for SSH access to EC2"
  default     = "chesslab-key"
}

variable "dockerhub_image" {
  type        = string
  description = "DockerHub image for FastAPI backend"
  default     = "joelhutchinson/chesslab-backend:latest"
}
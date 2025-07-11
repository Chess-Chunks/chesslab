terraform {
    cloud { 
        organization = "ChessChunks" 

        workspaces { 
            name = "chess-lab" 
        } 
    }

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 3.0"
    }
  }

  required_version = ">= 1.3.0"
}

provider "aws" {
  region = var.aws_region
}

provider "cloudflare" {
  # Assumes CLOUDFLARE_API_TOKEN env var is set
}
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
    }
}

provider "aws" {
  region = "us-east-1"
}
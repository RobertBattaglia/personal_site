terraform {
  required_providers {
    aws = {
      version = "~> 4.47.0"
    }
  }
  backend "s3" {
    bucket = "com-robertbattaglia-terraform"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  profile = "personal_site"
  region  = var.aws_region
}

resource "aws_s3_bucket" "storage" {
  bucket_prefix = "com-robertbattaglia-"
}

resource "aws_dynamodb_table" "blogLikes" {
  name         = "blogLikes"
  hash_key     = "slug"
  billing_mode = "PROVISIONED"

  attribute {
    name = "slug"
    type = "S"
  }

  attribute {
    name = "likes"
    type = "N"
  }

  read_capacity  = "5"
  write_capacity = "5"
}

resource "aws_iam_user" "netlify" {
  force_destroy = "true"
  name          = "netlify"
  path          = "/"
}

resource "aws_iam_access_key" "netlifyAccessKey" {
  user    = aws_iam_user.netlify.name
  pgp_key = var.pgp_key
}

resource "aws_iam_user_policy_attachment" "DynamoFullAccess" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
  user       = aws_iam_user.netlify.name
}

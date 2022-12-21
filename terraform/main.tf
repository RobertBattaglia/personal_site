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

resource "aws_dynamodb_table" "blog_likes" {
  name         = "blogLikes"
  hash_key     = "slug"
  billing_mode = "PROVISIONED"

  attribute {
    name = "slug"
    type = "S"
  }

  read_capacity  = "5"
  write_capacity = "5"
}

resource "aws_iam_user" "netlify" {
  force_destroy = "true"
  name          = "netlify"
  path          = "/"
}

resource "aws_iam_access_key" "netlify_access_key" {
  user    = aws_iam_user.netlify.name
  pgp_key = var.pgp_key
}

resource "aws_iam_user_policy_attachment" "dynamo_policy_attachment" {
  user       = aws_iam_user.netlify.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonDynamoDBFullAccess"
}

resource "aws_iam_user_policy_attachment" "s3_policy_attachment" {
  user       = aws_iam_user.netlify.name
  policy_arn = aws_iam_policy.s3_read_policy.arn
}

resource "aws_iam_policy" "s3_read_policy" {
  name   = "s3_read_policy"
  policy = data.aws_iam_policy_document.s3_read_permissions.json
}

data "aws_iam_policy_document" "s3_read_permissions" {
  statement {
    effect = "Allow"

    actions = [
      "s3:ListBucket",
    ]

    resources = [aws_s3_bucket.storage.arn]
  }

  statement {
    effect = "Allow"

    actions = [
      "s3:GetObject",
    ]

    resources = ["${aws_s3_bucket.storage.arn}/*"]
  }
}

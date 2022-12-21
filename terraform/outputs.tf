output "aws_s3_bucket_storage" {
  value = aws_s3_bucket.storage.id
}

output "aws_dynamodb_table_blogLikes_id" {
  value = aws_dynamodb_table.blog_likes.id
}

output "netlify_access_key_id" {
  value = aws_iam_access_key.netlify_access_key.id
}

output "netlify_access_key_secret" {
  value = aws_iam_access_key.netlify_access_key.encrypted_secret
}

output "aws_region" {
  value = var.aws_region
}

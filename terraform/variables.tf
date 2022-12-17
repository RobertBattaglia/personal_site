variable "pgp_key" {
  type        = string
  description = "Base64 encoded PGP public key to encrypt user access key"
  default     = "keybase:robertbattaglia"
}

variable "aws_region" {
  type        = string
  description = "AWS Region for our infrastructure"
  default     = "us-east-1"
}

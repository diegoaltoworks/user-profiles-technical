
resource "google_cloud_run_service" "web" {
  name     = "web-service"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/web:latest"
        env {
          name  = "PROJECT_NAME"
          value = local.project_name
        }
        env {
          name  = "PROJECT_VERSION"
          value = local.project_version
        }
        env {
          name  = "NEXT_PUBLIC_API_HOST"
          value = local.next_public_api_host
        }
        env {
          name  = "NEXT_PUBLIC_WEB_HOST"
          value = local.next_public_web_host
        }
        env {
          name  = "NEXT_PUBLIC_GITHUB_USERNAME"
          value = local.next_public_github_username
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

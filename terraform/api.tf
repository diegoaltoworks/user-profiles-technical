
resource "google_cloud_run_service" "api" {
  name     = "api-service"
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
          name  = "TURSO_DATABASE_URL"
          value = local.turso_database_url
        }
        env {
          name  = "TURSO_AUTH_TOKEN"
          value = local.turso_auth_token
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

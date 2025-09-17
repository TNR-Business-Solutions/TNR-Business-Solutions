# Deployment Scripts for AI Chatbot

This folder contains scripts and configuration files for deploying the distributed AI chatbot system using Ray, Docker, and Kubernetes.

## Structure


```text
infra/
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
├── k8s/
│   ├── ray-cluster.yaml
│   ├── orchestrator-deployment.yaml
│   ├── symbolic-engine-deployment.yaml
│   ├── multimodal-embedding-deployment.yaml
│   └── frontend-deployment.yaml
├── cloud/
│   ├── terraform/
│   └── README.md
└── README.md

```

---

## Example: Dockerfile for Backend


```Dockerfile
# infra/docker/Dockerfile.backend
FROM python:3.10-slim
WORKDIR /app
COPY backend/ /app/backend/
RUN pip install -r /app/backend/requirements.txt
CMD ["uvicorn", "orchestrator.main:app", "--host", "0.0.0.0", "--port", "8000"]

```

---

## Example: Ray Cluster Kubernetes YAML


```yaml
# infra/k8s/ray-cluster.yaml
apiVersion: ray.io/v1
kind: RayCluster
metadata:
  name: ai-ray-cluster
spec:
  rayVersion: '2.9.0'
  headGroupSpec:
    serviceType: ClusterIP
    template:
      spec:
        containers:
        - name: ray-head
          image: rayproject/ray:2.9.0
          resources:
            limits:
              cpu: 4
              memory: 16Gi
              nvidia.com/gpu: 1
  workerGroupSpecs:
  - groupName: worker
    replicas: 4
    template:
      spec:
        containers:
        - name: ray-worker
          image: rayproject/ray:2.9.0
          resources:
            limits:
              cpu: 4
              memory: 16Gi
              nvidia.com/gpu: 1

```

---

## Example: Orchestrator Deployment YAML


```yaml
# infra/k8s/orchestrator-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: orchestrator
spec:
  replicas: 2
  selector:
    matchLabels:
      app: orchestrator
  template:
    metadata:
      labels:
        app: orchestrator
    spec:
      containers:
      - name: orchestrator
        image: yourrepo/orchestrator:latest
        ports:
        - containerPort: 8000

```

---

## Example: Terraform Cloud Init (stub)


```hcl
# infra/cloud/terraform/main.tf
provider "aws" {
  region = "us-east-1"
}
resource "aws_instance" "ai_node" {
  ami           = "ami-0abcdef1234567890"
  instance_type = "g5.2xlarge"
  count         = 5
  tags = {
    Name = "ai-chatbot-node"
  }
}

```

---

## Next Steps

- Build Docker images for each service

- Apply Kubernetes configs to your cluster

- Use Terraform to provision cloud resources

- Update YAMLs and Dockerfiles as you alter backend/frontend code

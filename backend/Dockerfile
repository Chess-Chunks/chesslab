FROM python:3.13-slim-bookworm

# Create a non-root user with a home dir
RUN adduser --disabled-password --no-create-home --gecos '' appuser

WORKDIR /usr/src/app

COPY requirements.txt .

# Install dependencies as root
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code and change ownership
COPY --chown=appuser:appuser . .

# Switch to non-root user
USER appuser

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

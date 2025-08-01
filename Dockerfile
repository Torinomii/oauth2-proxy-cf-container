# Use the Alpine-based oauth2-proxy image for smaller size and faster startup
FROM quay.io/oauth2-proxy/oauth2-proxy:v7.6.0-alpine

# Copy the configuration file to the expected location
COPY oauth2-proxy.cfg /etc/oauth2-proxy/oauth2-proxy.cfg

# Expose port 8080
EXPOSE 4180

# Set resource-optimized startup command
ENTRYPOINT ["/bin/oauth2-proxy"]
CMD ["--config=/etc/oauth2-proxy/oauth2-proxy.cfg", "--silence-ping-logging=true"]
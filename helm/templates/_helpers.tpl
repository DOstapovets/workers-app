{{- define "mongodb.host" -}}
{{- printf "%s-mongodb" .Release.Name -}}
{{- end -}}

{{- define "mongodb.uri" -}}
{{ $username := index .Values.mongodb.auth.usernames 0 | trim }}
{{ $password := index .Values.mongodb.auth.passwords 0 | trim }}
{{ $host := include "mongodb.host" . }}
{{ $database := index .Values.mongodb.auth.databases 0 | trim }}
{{- printf "mongodb://%s:%s@%s/%s" $username $password $host $database | trim -}}
{{- end -}}

{{- define "redis.host" -}}
{{- printf "%s-redis" .Release.Name -}}
{{- end -}}



{{- define "initCheckContainers" -}}
- name: {{.Release.Name}}-redis-check
  image: busybox:1.31
  command: ['sh', '-c', 'for i in {1..200}; do sleep 2; if nc -vz ${REDIS_HOST} 6379; then exit 0; fi; done; exit 1']
  envFrom:
    - configMapRef:
        name: {{ .Release.Name }}-config
- name: {{.Release.Name}}-mongodb-check
  image: busybox:1.31
  command: ['sh', '-c', 'for i in {1..200}; do sleep 2; if nc -vz ${MONGODB_HOST} 27017; then exit 0; fi; done; exit 1']
  envFrom:
    - configMapRef:
        name: {{ .Release.Name }}-config
{{- end -}}
package main

import (
    "embed"
    "flag"
    "log"
    "net/http"
    "os"
    "path/filepath"
    "strconv"
    "strings"
)

//go:embed web
var memfs embed.FS
type microFS string
var downloader = http.FileServer(microFS(""))
var listenPort = flag.String("port", "9999", "--port=9999")

func main() {
    flag.Parse()
    http.HandleFunc("/", DownloadHandler)
    log.Printf("miniweb ListenAndServe at %s......\n", *listenPort)
    log.Println(http.ListenAndServe(":" + *listenPort, nil))
}

func DownloadHandler(w http.ResponseWriter, r *http.Request) {
    log.Printf("Download %s ===> RequestURI: %s\n", r.URL.Path, r.RequestURI)
    downloader.ServeHTTP(w, r)
    return
}

func (p microFS) Open(name string) (http.File, error) {
    if name == "/" {
        return http.FS(memfs).Open("web")
    }
    if _, err := memfs.Open("web/" + strings.TrimPrefix(name, "/")); err == nil {
        return http.FS(memfs).Open("web/" + strings.TrimPrefix(name, "/"))
    }

    workDir, _ := os.Getwd()
    if strings.HasPrefix(name, "/" + filepath.Base(workDir)) {
        name = strings.TrimPrefix(name, "/" + filepath.Base(workDir))
    }
    log.Println(filepath.Join(workDir, strings.TrimPrefix(name, "/")))
    return http.Dir(workDir).Open("./" + strings.TrimPrefix(name, "/"))
}

func httpResponse(w http.ResponseWriter, r *http.Request, data []byte, strType string) {
    log.Printf("%s %s ===> Content-Type: %s, Content-Length: %d\n", r.Method, r.RequestURI, strType, len(data))
    w.Header().Set("Content-Length", strconv.Itoa(len(data)))
    w.Header().Set("Content-Type", strType)
    w.WriteHeader(http.StatusOK)
    w.Write(data)
}
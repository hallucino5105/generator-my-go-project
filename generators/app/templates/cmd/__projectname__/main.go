package main

import (
	"github.com/hallucino5105/<%= projectNameSnakeCase %>/cmd/garg"
	"github.com/hallucino5105/glog"
)

func init() {
	garg.ParseArg()
	glog.SetupLogger(glog.WithVerbose(garg.GlobalOptions.Verbose))
}

func main() {
	glog.Debug("<%= projectNameSnakeCase %>")
}

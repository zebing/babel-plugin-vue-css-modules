export default (importTokens: any) => {
  return {
    JSXAttribute (path, state) {
      console.log(importTokens)
    }
  }
}
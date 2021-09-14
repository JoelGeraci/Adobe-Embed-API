function executeSearch() {
  var previewFilePromise = window.adobeFilePreview;
  previewFilePromise.then(adobeViewer => {
    adobeViewer.getAPIs().then(apis => {
      if ($("#search-term").val().length == 0) {
        $("#search-term").val($("#search-term").attr("placeholder"));
      }
      apis.search($("#search-term").val()).then(searchObject => {
        window.searchObject = searchObject;
        searchObject.onResultsUpdate(onResultsUpdate)
          .catch(error => onFail(error));
      })
        .catch(error => onFail(error));
    });
  });
}

function onResultsUpdate(result) {
  updateSearchLocation(result)
}

function searchNext() {
  window.searchObject.next();
}

function searchPrevious() {
  window.searchObject.previous();
}

function searchClear() {
  window.searchObject.clear();
  $(".search-location").css("display", "none");
  $("#search-term").val("");
}

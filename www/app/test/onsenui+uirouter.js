ons.bootstrap(['ui.router']).config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/page1");

  $stateProvider
  .state('page1', {
    url: "/page1"
  })
  .state('page2', {
    parent: 'page1',
    onEnter: function($rootScope) {
      $rootScope.navi.pushPage('page2.html');
    },
    onExit: function($rootScope) {
        $rootScope.navi.popPage();
    }
  })
  .state('page3', {
    parent: 'page2',
    onEnter: function($rootScope) {
      $rootScope.navi.pushPage('page3.html');
    },
    onExit: function($rootScope) {
      $rootScope.navi.popPage();
    }
  })
});


<ons-navigator title="Navigator" var="navi">
  <ons-page>
    <ons-toolbar>
      <div class="center">Simple Navigation</div>
    </ons-toolbar>
    <div style="text-align: center">
      <br>
      <ons-button modifier="light" ui-sref="page2">
        Push Page
      </ons-button>
    </div>
  </ons-page>
</ons-navigator>

<ons-template id="page2.html">
  <ons-page>
    <ons-toolbar>
      <div class="center">Page 2</div>
    </ons-toolbar>

    <div style="text-align: center">
      <br />
      <ons-button modifier="light" ui-sref="page3">
        Push Page
      </ons-button>
      <ons-button modifier="light" ui-sref="^">
        Pop Page
      </ons-button>
    </div>
  </ons-page>
</ons-template>

<ons-template id="page3.html">
  <ons-page>
    <ons-toolbar>
      <div class="center">Page 3</div>
    </ons-toolbar>

    <div style="text-align: center">
      <br />
      <ons-button modifier="light" ui-sref="^">
        Pop Page
      </ons-button>
      <ons-button modifier="light" ui-sref="page1">
        Back to top
      </ons-button>
    </div>
  </ons-page>
</ons-template>


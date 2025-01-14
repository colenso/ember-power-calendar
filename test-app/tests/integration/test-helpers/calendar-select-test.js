import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { calendarSelect } from 'ember-power-calendar/test-support';

module('Test Support | Helper | calendarSelect', function (hooks) {
  setupRenderingTest(hooks);

  test('`calendarSelect` selects the given date ', async function (assert) {
    this.center4 = new Date(2013, 9, 18);
    this.selected4 = new Date(2013, 9, 15);
    this.onCenterChange = (selected) => {
      this.set('center4', selected.date);
    };
    this.onSelect = (selected) => {
      this.set('selected4', selected.date);
    };
    await render(hbs`
      <div class="calendar-select-1">
        <PowerCalendar
          @center={{this.center4}}
          @selected={{this.selected4}}
          @onSelect={{this.onSelect}}
          @onCenterChange={{this.onCenterChange}} as |calendar|>
          <calendar.Nav/>
          <calendar.Days/>
        </PowerCalendar>
      </div>
    `);

    assert
      .dom('.calendar-select-1 .ember-power-calendar-nav-title')
      .hasText('October 2013');
    assert
      .dom('.calendar-select-1 [data-date="2013-10-15"]')
      .hasClass('ember-power-calendar-day--selected', 'The 15th is selected');
    await calendarSelect('.calendar-select-1', new Date(2013, 9, 11));

    assert
      .dom('.calendar-select-1 [data-date="2013-10-11"]')
      .hasClass(
        'ember-power-calendar-day--selected',
        'The 11th of October is selected',
      );
  });

  test('`calendarSelect` selects the given date changing the month center on the process', async function (assert) {
    this.center4 = new Date(2013, 9, 18);
    this.selected4 = new Date(2013, 9, 15);
    this.onCenterChange = (selected) => {
      this.set('center4', selected.date);
    };
    this.onSelect = (selected) => {
      this.set('selected4', selected.date);
    };
    await render(hbs`
      <div class="calendar-select-1">
        <PowerCalendar
          @center={{this.center4}}
          @selected={{this.selected4}}
          @onSelect={{this.onSelect}}
          @onCenterChange={{this.onCenterChange}} as |calendar|>
          <calendar.Nav/>
          <calendar.Days/>
        </PowerCalendar>
      </div>
    `);

    assert
      .dom('.calendar-select-1 .ember-power-calendar-nav-title')
      .hasText('October 2013');
    assert
      .dom('.calendar-select-1 [data-date="2013-10-15"]')
      .hasClass('ember-power-calendar-day--selected', 'The 15th is selected');
    await calendarSelect('.calendar-select-1', new Date(2013, 8, 3));

    assert
      .dom('.calendar-select-1 .ember-power-calendar-nav-title')
      .hasText('September 2013', 'The nav component has updated');
    assert
      .dom('.calendar-select-1 [data-date="2013-09-01"]')
      .exists('The days component has updated');
    assert
      .dom('.calendar-select-1 [data-date="2013-09-03"]')
      .hasClass(
        'ember-power-calendar-day--selected',
        'The 3rd of september is selected',
      );
  });
});

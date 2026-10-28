import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

export interface WatchProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  display_priority?: number;
}

interface ProviderGroup {
  label: string;
  providers: WatchProvider[];
}

interface RegionOption {
  code: string;
  name: string;
}

@Component({
  selector: 'app-watch-providers',
  templateUrl: './watch-providers.component.html',
  styleUrls: ['./watch-providers.component.scss']
})
export class WatchProvidersComponent implements OnChanges {
  // The `results` object of TMDB's /watch/providers response, keyed by country code.
  @Input() results: any = null;
  // Shown first when the title is available there.
  @Input() preferredRegion = '';

  regions: RegionOption[] = [];
  region = '';
  groups: ProviderGroup[] = [];
  link = '';
  loaded = false;

  // TMDB buckets providers under these keys; this is also the order we show them in.
  private readonly buckets: Array<[string, string]> = [
    ['flatrate', 'Stream'],
    ['free', 'Free'],
    ['ads', 'Free with ads'],
    ['rent', 'Rent'],
    ['buy', 'Buy']
  ];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['results'] || changes['preferredRegion']) {
      this.buildRegions();
      this.selectRegion(this.defaultRegion());
    }
  }

  onRegionChange(event: Event): void {
    this.selectRegion((event.target as HTMLSelectElement).value);
  }

  selectRegion(code: string): void {
    this.region = code;
    this.groups = [];
    this.link = '';

    const entry = code && this.results ? this.results[code] : null;
    if (!entry) {
      return;
    }

    // TMDB asks that we send people to their deep link rather than straight to a provider.
    this.link = entry['link'] || '';

    for (const [key, label] of this.buckets) {
      const providers: WatchProvider[] = entry[key] || [];
      if (providers.length) {
        this.groups.push({
          label,
          providers: [...providers].sort(
            (a, b) => (a.display_priority ?? 0) - (b.display_priority ?? 0)
          )
        });
      }
    }
  }

  get regionLabel(): string {
    const match = this.regions.find(r => r.code === this.region);
    return match ? match.name : this.region;
  }

  private buildRegions(): void {
    this.loaded = !!this.results;
    this.regions = Object.keys(this.results || {})
      .map(code => ({ code, name: this.regionName(code) }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  // Falls back to the browser's region, then to whatever the title does have.
  private defaultRegion(): string {
    const codes = this.regions.map(r => r.code);
    for (const code of [this.preferredRegion, this.browserRegion()]) {
      if (code && codes.indexOf(code) !== -1) {
        return code;
      }
    }
    return codes.length ? codes[0] : '';
  }

  private browserRegion(): string {
    const locale = typeof navigator !== 'undefined' ? navigator.language : '';
    const parts = (locale || '').split('-');
    return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : '';
  }

  // Intl.DisplayNames is not in the project's `lib`, so reach for it defensively.
  private regionName(code: string): string {
    try {
      const displayNames = (Intl as any).DisplayNames;
      if (displayNames) {
        return new displayNames(['en'], { type: 'region' }).of(code) || code;
      }
    } catch {
      // Fall through to the bare country code.
    }
    return code;
  }
}

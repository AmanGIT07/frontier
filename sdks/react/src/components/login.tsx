import React, { ComponentPropsWithRef, useCallback } from "react";
import { useShieldContext } from "../contexts/ShieldContext";
import { useStrategyContext } from "../contexts/StrategyContext";
import { MagicLink } from "./magiclink";
import { OIDCButton } from "./oidc";

const styles = {
  container: {
    fontSize: "12px",

    width: "28rem",
    maxWidth: "100%",
    padding: "1.5rem",

    color: "rgb(60, 74, 90)",
    backgroundColor: "#FFF",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  },
  logoContainer: {
    marginBottom: "1.5rem",
  },
  titleContainer: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  fieldset: {
    width: "100%",
    border: "1px solid transparent",
    borderTopColor: "rgb(205, 211, 223)",
    gridArea: "1 / 1",
    padding: 0,
    margin: "2px",
  },
  legend: {
    fontSize: "8px",
    margin: "auto",
    padding: "0 4px",
  },
};

const shadowOptions = {
  none: "none",
  xs: "0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
  sm: "0px 1px 4px 0px rgba(0, 0, 0, 0.09)",
  md: "0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08)",
  lg: "0px 8px 8px -4px rgba(16, 24, 40, 0.03), 0px 20px 24px -4px rgba(16, 24, 40, 0.08)",
};

const borderRadiusOptions = {
  none: "0",
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
};

const defaultLogo = (
  <img
    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI0Y1RjVGNSIvPgo8cmVjdCB4PSItMTE5LjUiIHk9Ii00OS41IiB3aWR0aD0iMjAyIiBoZWlnaHQ9IjEyOCIgcng9IjQuNSIgZmlsbD0iI0ZCRkNGRCIvPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMTgzN184MDMpIj4KPHJlY3Qgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBmaWxsPSJ1cmwoI3BhdHRlcm4wKSIvPgo8L2c+CjxyZWN0IHg9Ii0xMTkuNSIgeT0iLTQ5LjUiIHdpZHRoPSIyMDIiIGhlaWdodD0iMTI4IiByeD0iNC41IiBzdHJva2U9IiM5NzQ3RkYiIHN0cm9rZS1kYXNoYXJyYXk9IjEwIDUiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuMCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfMTgzN184MDMiIHRyYW5zZm9ybT0ic2NhbGUoMC4wMDIpIi8+CjwvcGF0dGVybj4KPGNsaXBQYXRoIGlkPSJjbGlwMF8xODM3XzgwMyI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcng9IjEwIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8aW1hZ2UgaWQ9ImltYWdlMF8xODM3XzgwMyIgd2lkdGg9IjUwMCIgaGVpZ2h0PSI1MDAiIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBZlFBQUFIMENBWUFBQURMMXQrS0FBQUFDWEJJV1hNQUFBc1RBQUFMRXdFQW1wd1lBQUFBQVhOU1IwSUFyczRjNlFBQUFBUm5RVTFCQUFDeGp3djhZUVVBQUI3c1NVUkJWSGdCN2QweFZoM1p0UWJnVWo4SER1VVJ0RFVDUWVaTUtITW1sRGtUeXB3Qkk1Q0k3QXlVT1FOR0FCb0JLTE1qMEFpRVJpQXBjM1lmKzNiZnRxUVdjSUdxT3VmcytyNjE5bXE2bisxWFczMnAvNTZxWGFjZWRGMDM2d0NBcHYzVUFRRE5FK2dBa0lCQUI0QUVCRG9BSkNEUUFTQUJnUTRBQ1FoMEFFaEFvQU5BQWdJZEFCSVE2QUNRZ0VBSGdBUUVPZ0FrSU5BQklBR0JEZ0FKQ0hRQVNFQ2dBMEFDQWgwQUVoRG9BSkNBUUFlQUJBUTZBQ1FnMEFFZ0FZRU9BQWtJZEFCSVFLQURRQUlDSFFBU0VPZ0FrSUJBQjRBRUJEb0FKQ0RRQVNBQmdRNEFDUWgwQUVoQW9BTkFBZ0lkQUJJUTZBQ1FnRUFIZ0FRRU9nQWtJTkFCSUFHQkRnQUpDSFFBU0VDZ0EwQUNBaDBBRWhEb0FKQ0FRQWVBQkFRNkFDUWcwQUVnQVlFT0FBa0lkQUJJUUtBRFFBSUNIUUFTRU9nQWtJQkFCNEFFQkRvQUpDRFFBU0FCZ1E0QUNRaDBBRWhBb0FOQUFnSWRBQklRNkFDUWdFQUhnQVFFT2dBa0lOQUJJQUdCRGdBSkNIUUFTRUNnQTBBQ0FoMEFFaERvQUpDQVFBZUFCQVE2QUNRZzBBRWdBWUVPQUFrSWRBQklRS0FEUUFJQ0hRQVNFT2dBa0lCQUI0QUVCRG9BSkNEUUFTQUJnUTRBQ1FoMEFFaEFvQU5BQWdJZEFCSVE2QUNRZ0VBSGdBUUVPZ0FrSU5BQklBR0JEZ0FKQ0hRQVNFQ2dBMEFDQWgwQUV2aERCMVRyNGNPSDgvcnpuLzg4cjhYZi8venp6L1AvZS95enIvLzY5WC9uT3A4L2Y1N1hWVDkvL1BoeC90ZUxpNHZmL3RuaVo2Qk9EeTVyMWdIRlJCaXZyS3o4RnRvUjF2SDN5d1R6Mkw0Tzl2ZnYzODkvUGo4L24vOTkvQlVvUjZERFNDS2MxOWJXNXFIOStQSGozMEs4dHRDK2p3ajFDUGwzNzk3TmYxNkVQVEE4Z1E0RGlKQ093STU2OHVUSmIrRTlSWXRWZkt6b1QwOVBoVHdNUktCRER5TEExOWZYdndsd3JoYWhIcXY0UmNCSDZBUDNJOURoRGhZcjhBanhaOCtlVFhiMTNaZEZ3QjhmSDF2Qnd4MEpkRmhTaFBZaXdCZERhd3dqVnU2SGg0Znp2MXE5dzNJRU9sd2podGppRXZyaWNqcmpXNnplRHc0T1ROTEROUVE2ZkdjUjRoc2JHeTZsVnlaVzYyL2Z2aFh1OEFNQ0hicGY3b2x2Ym01YWlUY2t3djNObXpmeisrNHV5NE5BWjhJV2sra3ZYcnlZcjhwcDErS2VlNnpjWWFvRU9wTVQ0YjBJY29OdHVjUktQY0o5WjJmSHFwM0pFZWhNUmdUNXExZXZyTVlud3FxZHFSSG9wTGE0Tjc2MXRXVTFQbEd4VW84VnUwZmd5RTZnazVJZzUwZGl0ZTV5UEZrSmRGS0p5K254dUZuY0g0ZXJDSFl5RXVpazRQNDRkeUhZeVVTZzA3UjRabngzZDFlUWN5K0NuUXgrNnFCQnNZTmJuSVRQenM2RU9mY1d0MmsrZlBqUTdlL3YyeDJRWmxtaDB4VERib3pCaXAwV0NYU2FFZmZJQlRsaldXd3R1N2UzMTBFTEJEclZpMHZxTG9WU3l1STVkaHZVVUR1QlRyVWl3Q1BJM1NPbkJpN0RVenVCVG5YY0o2ZG1yMSsvbmdjNzFFYWdVeFdYMTJsQnJOSzN0N2ZucjI2RlduaHNqU3JFU2p5ZUp6ODVPUkhtVkM4K28wZEhSNzU4VXBYL3U2elhIUlFVcnpLTklIZXZuTmJFeGtieCtmM3k1VXQzZm43ZVFVbFc2QlFUcS9KWTRjUkt4NzF5V3JVWTNyUmFwelQzMENuQ3ZYSXljbStka3F6UUdaVjc1V1MydUxjZW15REIyS3pRR1UyYzdHTGw4dmp4NHc2eWk5WDYwNmRQUGJmT2FLelFHVVU4Vng0dlVoSG1URVY4Z1kzUGZPeW5BR013NWM2ZzRoTDdQLzd4ai9sbUhILzg0eDg3bUpMNHpQLzFyMytkL3g3ODV6Ly82Zjc3My85Mk1CU1gzQmxNckZEY0s0ZGZ1QVRQMEZ4eVp4RHhiRzVjYmhUbThJdkZKZmo0M1lBaHVPUk83MkxDOTEvLytwZEw3UENkK0ozNDI5LytOdi81M2J0M0hmVEpKWGQ2czNna2JXTmpvd091RjA5OHZIejVzdnY4K1hNSGZSRG85TUlqYVhCNzdxdlRKL2ZRdWJmWXp6cUczNFE1M0k3QlVmb2swTG1YRnk5ZU9DSEJQUmlXb3krRzRyaXoyQ3pHOEJ2Y24yRTUraURRdVpPWVpQL25QLy9aQWYxWnZFSllxSE1YQXAxYml6Q1BuZCtBL2dsMTdzcVVPN2NTcnp6MVdCb003K0RnWVA1WUd5ekxVQnhMRStZd252aGRpOTg1V0pZVk9qZUtEV1BpSGMrTFM0SEFlRTVQVDd2bno1L2JnSVliQ1hTdUZXRWVKeFRQbUVNNTUrZm44dzFvaERyWGNjbWRLd2x6cU1OaTg2YjRuWVNyQ0hTdUZKZlpoVG5VSVVJOWZpZmhLZ0tkSDRwaEhQZk1vUzd4TzJsUWpxc0lkSDdITkR2VXkvUTdWN0d4RE4rSVRXTzJ0clk2b0Y1eCtUM1lmSWF2Q1hSK1l3YzRhSWNkNWZpZVFHZE9tRU43SXRTL2ZQblMvZnZmLys3QWMrak1YOXRvZWhiYUZmZlZEdzhQTzZaTm9FL2M0bDNNbm0rRmRzV0dNN0h4VEd4QXczU1pjcCt3Q0hPYlZVRDdGdHN6eCs4MDAyV0ZQbEZ4QW9pVnVSTUE1R0dMMkdtelFwK29lSTVWbUVNdThUamI3dTV1eHpTWmNwK2dtR2ovKzkvLzNnSDVlRVo5dWx4eW54Z1Q3VEFOOGNyVjQrUGpqdWtRNkJOaW9oMm1JKzZqcjY2dWRoY1hGeDNUNEI3NlJFU0ltMmlINmZBN1B6MENmU0xpdnJraE9KaVcrSjJQMzMybXdWRGNCR3h1YnRyV0ZTYnFMMy81aSsxaEo4STk5T1RjTndmY1Q1OEdsOXlUY3c4TldPd2s1MXlRbTBCUHpIMXpZQ0dlVDNjL1BUZVgzSlB5dkRud0k3RTE3T25wYVVjK0FqMmh4VXRYck02Qjc4Vjk5TGlmYnIvM2ZGeHlUeWdtMm9VNThDTnhickRmZTA1VzZNbHNiR3pNWDd3Q2NCMWJ3K1lqMEJOeHFSMVlWbHh5Zi9Ub2tVdnZpYmprbm9oTDdjQ3k0aEUyVSsrNVdLRW5ZYW9kdUF0VDcza0k5Q1ErZlBoZ2RRN2NtcW4zUEZ4eVQ4QUdNc0JkeGJsamEydXJvMzFXNkkyTFg4WlluUVBjbGIzZWM3QkNiNXkzcUFIM0ZRTnlIbmR0bjBCdldEeHovdUxGaXc3Z3Z0YlcxdVpGdTF4eWI1aEJPS0JQY2NrOW5rMm5UVmJvamRyYzNCVG1RSy9pbk9JMlhydXMwQnRrUnpoZ0tIYVFhNWNWZW9Qc0NBY01KUWJrUE1iV0ppdjB4bmhNRFJpYXg5amFaSVhlR1BlM2dLSFo1NzFOVnVnTnNUb0h4aFNyOVBQejg0NDJXS0UzeE9vY0dOUHU3bTVITzZ6UUcyRjFEcFRnYld6dHNFSnZoTlU1VUlKNzZlMndRbStBMVRsUWtsVjZHNnpRRzJCMURwVGtuUkZ0c0VLdm5OVTVVSU0vL2VsUGRvK3JuQlY2NWF6T2dScllQYTUrVnVnVnN6b0hhbUdQOS9wWm9WZk11NG1CV3RqanZYNVc2Qlh6dm5PZ0pyRTZqM3ZwMU1rS3ZWSWJHeHZDSEtoS3JOSmRPYXlYUUsrVXgwU0FHdGxvcGw0dXVWZklNQnhRTXh2TjFNa0t2VUllVlFOcXRyNiszbEVmSy9RS0dZWURhdVlSdGpwWm9WZkdNQnhRdXhpT3MwcXZqMEN2akdFNG9BWE9WZlZ4eWIwaWh1R0FsdGpmdlM1VzZCVnhDUXRvaVozajZtS0ZYaEhEY0VCTHpzL1B1OVhWMVk0NldLRlhZbVZsUlpnRFRZbnpscDNqNmlIUUt4SFQ3UUN0RWVqMWNNbTlFaTYzQXkyNnVMaVlQNU5PZVZib0ZYQzVIV2hWbkx1czB1c2cwQ3ZnY2p2UU1vRmVCNEZlZ1NkUG5uUUFyWHIyN0ZsSGVlNmhGMll6R1NDRHVJOGU5OU1weHdxOU1KZXFnQXhzakZXZVFDL01mc2hBQmk2N2wrZVNlMEh4eHFKUG56NTFBSzN6U3RYeXJOQUxpc2ZWQURLSUJZcHpXbGtDdlNEM25JQk1uTlBLRXVnRmVWd055TVI5OUxMY1F5L0U0MnBBUnQ2UlhvNFZlaUh1TlFFWnVleGVqa0F2eFBQblFFWVdLK1VJOUVMY1B3Y3ljbTRyeHozMEFqeC9EbVRtUG5vWlZ1Z0Z1Q1FGWk9ZY1Y0WkFMOEQ5Y3lBemdWNkdRQy9BaHgzSXpLS2xESUZld09QSGp6dUFySnpqeWpBVU56SURjY0FVR0l3Ym54WDZ5Rnh1QjZiQVpmZnhDZlNSQ1hSZ0NtSjdhOFlsMEVmbVd5c3dCZTZqajArZ2orem5uMy91QUxKek5YSjhodUpHTnB2NTR3YnlpNEc0R0l4alBGYm9JL0tORlppS2VLTEhmZlJ4Q2ZRUnhRY2NZQ29zWXNZbDBFZmt3dzFNaVJYNnVBVDZpSHk0Z1NseHpodVhRQitSeHppQUtSSG80eExvSTNJUEhaZ1NpNWh4Q2ZRUitiWUtUSWxGekxnRStramlnKzNERFV5Sjg5NjRCUHBJck02QktSTG80eEhvSS9HaEJxYklZbVk4QW4wa0FoMllJb0UrSG9FK0VoOXFZSW9zWnNZajBFZmlRdzFNa1hQZmVQN1FNUW9yOU9tSXQwd2RIaDUyNStmbjNjWEZ4ZnlmeGJhL3o1NDk2OWJXMXJvVzZZbTc4c3JvY2MzVThIVjhmRHdqdjcyOXZkbmxpdVRLejhIbEY3dlpodzhmWmkzUkUvZXh2NzlmNVRrNWFUVjFzTTNXeWNuSmpOdzJOamFXL2p3Y0hCek1XcUNuTm5xcVdaejdhamdIVDZTYU90aG1TNkRudHJXMWxlNHpvU2UvdTMwUTZLTldVd2ZiYkoyZG5jM0k2ZlhyMTNmNlRNUmwzVnJwcVkyZVdoQzNMa3FkZDZkV3B0eEhZdEl6cCtQajQrNHlLTHE3aUVHczA5UFRyalo2K2xhdFBjSDNCRHJjVVp6b1g3NTgyZDFIVEZuWFJFOC9WbHRQOENNQ2ZTUlc2TGxFU0R4OStuVCs2Tk45eENOVHRkRFQxV3JxcVRYT2ZlTVI2Q1B4b2M3bCtmUG52ejI3bklXZUdJSnozM2dFT3R6Uzl2WjJieXUyV2s1MmVycWVVS0lGQWgxdVlXZG5wOXZiMit2NkVqdVRsYWFubTlYUUV5eWpxYkg4Vm92MnhlNWlmWDh1U3U5R3BxYzJlbXJka09kVzlVMDFkYkRORm0yTEUvcDFXNFhlcFdMSE1qM3BhUXFHUHIrcVgrckJyejh3c0Y4KzA3Um9NU25kNTNCVnZLem43T3lzMkwxWlBTMm5kRTlaUEhqd29HTjQ3cUhETmVKeHB5RkM0dVRrcEZoSTZHazVwWHVDMnhMb2NJM1lrS1R2eDU1aTE3S1NyOVBWMDNKSzl3UzNKZEJIY3QrTkxSaGZURXJIU2IxUHU3dTczZVBIajd0UzlMU2MwajFsNHR3M3JtWnUrTGRjcG1UYk1zU2s5S3RYcjJZbDZhbU5uckx4Y3BaUnE2bURiYllFZWp2T3o4OTcvL2UvdnI0K0swbFBiZlNVa1VBZnIxeHloNi9FZmRqTGszclhwN2dQdTcrLzM1V2lwK1dVN2lrcmw5ekhJOUJIWWovcCtwbitYbzZldUEyQlBoNkJEci9xZTFJNndpRkNJdFAwdDU2Z1hnSjlKQjgvZnV5bzF4Q1QwcTlldlNvYUVucGFUdW1lc3Z2eTVVdkhlS3EvMForaERnNE9adFRKOUxlZUdNNysvdjZnNTFiMVRUVjFzTTNXNjlldlo5Um5pRW5wemMzTldVbDZhcU9ucVloejM1RG5WdlcvY3NsOUpBWkQ2alBFcEhTOFpyUFAxM2JlbHA2V1U3cW5LWEh1RzQ5QUg0a1BkVjJHZXBISDBkRlJWNHFlbGxPNnA2bnhoTTk0QlBwSWZLanJZdnI3Wm5xaUR4WXo0eEhvSXhIbzlZaEo2ZFBUMDY1UHNTRko2ZWx2UGQyc2RFOVRKTkRIMWRSTi8xYnJjbVV3bzd3aEJuUktUMHJycVkyZXBpck9mVU9lVzlVMzFkVEJObDJmUG4yYVVjN2xmZFBlLzUyV25wVFdVeHM5VFZXYzg0WThwNnB2NjhHdlB6Q0NEeDgrdU54WFNOenlXRjFkN2ZYeVgweEtuNTJkZGFYb2FUbWxlNXF5OC9QeitiOVB4dUVlK29qZXYzL2ZNYjdGcEhTZklWSEw5TGVlcm1laXZTejN6OGNsMEVka01LNk01OCtmcDV1VTF0UE5UTFNYWnhFekxvRStJb0UrdnUzdDdmbGx2ejZWbnBUVzAzSk10SmZubkRlK1ptNzR0MTdyNitzenhtUDZXMCtVdGJhMk51ZzVWZjJ1bWpyWXB1dHl0VEJqSEVOTVNwY09DVDIxMFJQL3M3S3lNdWc1VlgxYnB0eEg5dW5UcC9tOVBZWXp4S1QwNVVwamZqKzJGRDB0cDNSUGZPdkJnd2NkNDNFUGZXVHVLUTNMOVBkeTlNVFErcDZKNEdZQ2ZXU21Qb2NUNGREM3BIU0VSS3o0U2wxVjBkTnlTdmZFNzMzOCtMRmpYQUo5Wkw2MURpZjIvdTc3ei9mNCtMajRmdVo2dWxucG52aTl2dmZoNTJZQ2ZXUXV1UThqUXFMdjkxdnY3dTUyang4LzdrclIwM0pLOThTUFdieVVVZlhVWHJieWtwYitYUVpFNy8rZVNrOUs2Nm1ObnJpYWw3SVVxYVlPTmtWOStQQmhSajh1VndHOW56aEs3eGVncHpaNjRtcHhqaHY2UEtwK1h5NjVGMkF3cmg5eCsrTHlwTjc3cEhUc01GYUtucFpUdWlldTV4eFhoa0F2d0xESS9VVTR4R05QMmFhLzlYUXpFKzMxYy8rOERJRmVnQS83L2IxOCtiTDNBY1BTazlKNldvNko5dnBadEpSVC9YMkJiR1V3N242RzJQdDdkM2QzVnBLZTJ1aUo1UmlJSzFaTkhXeWFPanM3bTNGN3ByLzFSTjNpM0Ria3VWTmRXMDBkYkpxS0V4NjNFNVBTZmY5NzJOemNuSldrcHpaNllubERmSmxUUzFkVEI1dW1OalkyWml3dkhvT0p0OVgxK2U4Zy92YytmZm8wSzBWUGJmVEU3Y1RqaEVPZlA5V1B5OXZXQ29rSjNYanpHamVMU2VsNEs5Y1FrOUtsaHF2MHRKelNQWEY3ang0OXNpTm1JYWJjQzRtVG53LzljdnFlbEk0dlU2VkRRazgzcTZFbmJpZWU0SEZlSzBlZ0YvVDI3ZHVPNjhYZTMvR1lVcDlpUTVMU0x5ZlIwODFLOThUdHZYdjNycU9zWnU0UFpLdTF0YlVaVnh2aXNhZlNrOUo2YXFNbjdpYk9hVU9lTTlXTjFkVEJwcXA0VnRPd3o0OWRYbXJ0L2MrNzlLUzBudHJvaWJ2ei9IbnhhdXBnMDFXY0VQbldFSlBTS3lzcnM1TDAxRVpQM04wUVgrN1U3Y285OU1MY1IvOVdETlFNc2ZmMzBkRlJWNHFlbGxPNkorN244UEN3b3l5UHJSVVdKN0hMbFU3SEwrS3hwejczdW85SjZiT3pzNkxEVlhxNldRMDljVDhlVnl2UENyMncrQVh3c3BaZmJHOXY5LzVuVVhwU1drL0xNZEhlTm8rcjFhT0pld09aSzZhRXA4NzB0NTVvbCsxZXE2bW1EalpsVGYzeHRjdjdwcjMvbVphZWxOWlRHejNSanhobUhQSWNxWllyOTlBckVmZlJwM2pKTVM3VHhmM1kyRG12TDVjbmwvbjkyRkwwdEp6U1BkR1ArR3pFL1hQS2N3KzlFbE9jRUYxTVN2Y1pFclZNZit2cGVpYmE4L0NrVGwyYXVaeVF1YVo0MmIzdnkzVHhUSFE4RzYwblBURWVsOXVycXFZT05uVmRYbjZjVGNYVzFsYnZmMzZsTituUlV4czkwWi80WWpia09WSGR1cG82Mk5RMWxXbDMwOTk2SW9jaHZ2Q3BlMVZUQjV1NlloL2s3SWFZbEM0ZEVucHFveWY2MS9mV3YrcmUxZFRCcHEvTWx5UGo4bHpmTDI5WVgxK2ZsYVNuTm5xaWYvWnVyNjlNdVZjbTY3VDdVSlBTc2NOWUtYcGFUdW1lR0lhOTIrdFUvYmVPS1ZYR1Y2cEdQMzFmbWlzOUthMm5ObnBpR0liaDZpd3I5TXJFeWlqYk45K2RuWjNlOTNrK1BqNHV1aEdQbnBaVHVpZUdjWHA2MmxHbnByNkJUS0V5UFpNK3hLVDA3dTd1ckNROXRkRVR3ekVNVjIwMWRiQ1RxUXpEY1VPOHNLSDBwTFNlMnVpSjRSaUdxN3FhT3RqSlZPdXI5UFB6ODk3L1RFcFBTdXVwalo0WTFzYkd4cURuUG5YMzhuS1dpbjM2OUtsNytQQmgxNXJGcEhTZjkyUGpQbXk4eUtQVW40ZWVsbE82SjRibFJTeDFNeFJYc1RkdjNuU3RpYUcrSVVMaThqSmZzWkRRMDNKSzk4VHdZbkNTdWpWek9XRnExZUlqYkhHNXRlOC9nN2dzckNjOVVkWVFqeldxM3F1cGc1MWN0YlMvdStsdlBaSFgvdjcrb09jNjFVczFkYkNUcTFiMmR6ZjlyU2R5c3pwdm9wbzYyRW5Xd2NIQnJHWkRURXB2Ym03T1N0SlRHejB4RHF2elpxcXBnNTFrMWZ3SVcyd0IyZmMzOTVXVmxhS3pBM3Bxb3lmR1kzWGVURFYxc0pPdEdqZWFzWis1bnNqUDZyeXBhdXBnSjFzMXJ0TGptUHJzTWVZRlNvZUVudHJvaWZGWW5UZFZUUjNzcEt1bVZmb1FrOUpIUjBlemt2VFVSaytNeCtxOHVXcnFZQ2RkY2MreUJrT0VST2xKYVQyMTBSUGpzanB2cnBvNjJNbFg2WW4zSVY3TVVIcFNXazl0OU1TNHJNN2JLM3U1TjZia1h0bXhUZWpxNnVwODI5QytYRjUxbVBkVGlwNldVN29ueGhkN3R2ZTVOVEREczVkN1krSVhyTVFlNzRzWGVmUVpFdkhsNVBKK2JGZUtucFpUdWlmR2Qza2xVSmczcXBuTENlcVhLckhIZTl5Lzc3dUgwcFBTZW1xako4WTF4SjRGYXB5eVFtOVFyTDdHWEtWdmIyOTM1K2ZuWFo4dTc4L05WMzZsNkdrNXBYdGlmSEZ1c1RwdlYxUGZRTlQvYW95VmsrbHZQVEVkY1U0WjhweWxCcSttRGxaOVZVTnZOaFBQRy9kOXpLVkRRazl0OUVRWkd4c2JnNTZ6MU9EVjFNR3E3MnFveldiaW0zcmNQKzN6V0V2dmRxZW5ObnFpREkrcHBhaW1EbFo5VnpHODB2ZUEzQkJETWFYMy90WlRHejFSamtHNEZOWFV3YW9mVk53LzdWUGZrOUkxaElTZTJ1aUpNb2FZd1ZCRnFxbURWVCtvUGg4dDJ0cmE2djM0NGozY0plbXBqWjRvd3lCY3FtcnFZTlVWMWNkOXp5RytwZS91N3M1SzBsTWJQVkhPK3ZyNllPY2xOWG8xZGJEcW10cmIyNXZkVmZ4Myt6NmUwcFBTZW1xako4b3hDSmV1bWpwWWRVM2RkUWU1SVNhbDQxdC9TWHBxb3lmS3NTTmN5bXJxWU5VTmRkc1Q5RkNUMG1OdlRhdW45bnFpTE0rY3A2eW1EbFl0VWN1K1lqVk81dGtlZTlKVEd6MVJsa3Z0YWF1cGcxVkwxTEpUNzBNTXc1U2VsTlpUR3oxUmprdnRxYXVwZzFWTDFrMVQ3NmEvOWNRMG1XcFBYVTBkckxwRlhUWDFidnBiVDB5VERXVFNWMU1IcTI1UmNlbjk3T3pzbTEvb3VOVGE5LytmMHBQU2VtcWpKOHF5Z2N3a3FxbURWYmVzcnllWlRYL3JpV2thWXJCU1ZWbE5IYXk2UThVMm9hYS85Y1IwRGJGVnNLcXltanBZZGNmcU95VDYzRC8rcnZvZTd0RVRHUTB4aTZHcXJhWU9WbFZTcHIvMVJQMkcyRjFRVlYxTkhheXFvRXgvNjRuNnVXOCt5V3JxWUZYaDJ0emNuSlUweFBTM25zakk4K2FUcktZT1ZoV3NsWldWV1VsRFRIL3JpWXc4Yno3WmF1cGdWYUVxUFNrOTFLTmNlaUtibzZPam91Y0tWYTRlL1BvRFhPbmh3NGZkMmRsWmR4a1dYU2xQbno3dFRrOVB1NzdvaVl3dUxpNjYxZFhWN3ZQbnp4M1Q4MU1ITjlqZjN5OGFFanM3TzcwR1g5QVQyVVNZeDVkRVlUNXR6VnhPVU9OWDZVbnBJZTRGNm9sc1RMU3JYNnVwZzFValZ1bEo2U0h1QmVxSmpFeTBxMStycVlOVkkxVU4wOTk5YjRpaEp6SXkwYTYrcXFZT1ZvMVFwci8xUkJ1RXVmcTZUTG56TzVjaFVYUzRLcVowejgvUHU3N1VNUDJkc1NmS2lzSEt5MER2WU1HVU83L3o3dDI3cnBUdDdlMWVneTljM3JjdUdud1plNktzdzhORFljNFBOWE01UVkxWEJ3Y0hzN0daYUcrako4cUszODFTNXdWVmZUVjFzR3JFT2prNW1ZMWxpT252MHNHWHNTZktpdC9KVXVjRDFVUTFkYkJxeElxSjdNdjd0TE9oRFRIOXZiYTJOaXNwWTArVUZTL3g4U3BVZFVNMWRiQnE1Qm82MUllYS9vNk5Oa3JKMkJObENYTzFaRFYxc0twQXhZbGtpTXZ2RVZEeEhIV2Z4MXI2VWE2TVBWRlcvTzRKYzdWa05YV3dxbUQxUFNpM3RiWFYrekhHU3Fha2pEMVJqZ0U0ZGN0cTZtQlY0ZW9yMUllWS90N2QzWjJWbExFbnloSG02ZzdWMU1HcUNpcUM2ejcyOXZaNlA2YlMwOThaZTZJY084Q3BPMVpUQjZzcXFidUdlbHcrN3Z0WTRzVVVKV1hzaVhLRXVicEhOWFd3cXFLNmJhaWJhRytqSjhvWllnWkRUYXFhT2xoVldjVktjcG53R2VKOXpUVk10SHZoQ24ySXo5TEd4c1pvdjdjcWJUVjFzS3JDV2lhRWhuaGZjK25wNzR3OU1iNzQzZW43VVVjMTJXcnFZRldsZFYyb20yaHZveWZHRjEvZytyN0tveVpkVFIyc3FyaGk4NHZZdi94ckp0cmI2SW54eFdOcE5veFJQVmRUQjZzYXFNV3czQkRUMzV1Ym03T1NNdmJFK0V5eXF5SHF3YTgvUUs4dTd5L1Azd0YrY1hIUjlTWGUvMzEyZHRaZHJtcTZFcUtYcDArZnB1cUpjWDMrL0xsNytmSmxkM3g4M0VIZkJEcE5pT0E3T1RtWi83V0VPQkd2cnE3Mkh1WWxlMkpjUTN3aGhLLzkxRUhsWXZWYU92aGlWZFhuaWJpR25oalBtemR2ZXY5Q0NOLzdRd2VWMjkvZkx4cDhPenM3dlY4aUxkMFQ0NGdyTy9INTJkdmI2MkFNemR6d1Y5T3IwdFBmUXd3dm1XaWZCbytrcVFMVjFNR3FDVlhwNmU5NEQzVzJuaGhIUE5yb2tUUTFkaG1LbzBvckt5dno2ZTlTaGhoZ0t0MFR3NHZQUzh4Ym5KNmVkakEyUTNGVUorNHRIeDBkZGFVTTlYaGF5WjRZM3VIaDRYendUWmhUaWhVNlZZbnA3MWpGbGh3WWk1TnlQRVBmbHhwNllqaWVMYWNXVnVoVXBmVDA5L2IyZHE5aEhreTA1eFdQb3oxNjlFaVlVNDFtYnZpci9CVnZNQ3YxK2xBVDdTd3JQcU5yYTJ0Vi9nNnBTVmRUQjZzbVVvdjk0TWNTTDVYcHV3Y1Q3Zm5FZTh2anMybUNYVlZhVFIyc21sREZNN3p4UnFxaHhXcXI3eE4wdk4rYVhPSXhScytWcThxcnFZTlZFNnlOalkzQkxzUEgvMjdmSitucjNnMVBlMXhlVncxVlV3ZXJKbHhiVzF1OUIyV3NwUHM4Um1HZXgrTHllbzIvQzBwZFVVMGRySnA0OVhrWlByNGc5SDE4Y1ZtV3RybFByaHF1cGc1V3FYbmROOWhOdFBNaisvdjc3cE9ybHF1cGcxWHFtN3BMc0E4eDBTN00yeFpYVnZxKy9hSlVnV3JxWUpYNllTMGI3RU5NdE1lejg3UXBndHpBbTBwVVRSMnNVdGZXZGNFKzFFUjczSE9sTFhGcFhaQ3JoTlhVd1NxMVZIMGY3Qkc2SGsrYk5zTnVLbnQ1T1F1cHhSN3FseXV4K2MrWEFkLzFLZlo4Zi96NGNVZmQ0dVVwc2VmNjN0N2UvR2ZJU3FEREhlenU3blpiVzFzZDlZclhtTzdzN0hpZEtaUHhodzY0bFZldlhnbnpTc1VLUE41TEhtOC9FK1JNalJVNjNNTDYrbnAzZEhUVVVaY0k3MFdRdTZ6T1ZBbDBXRkxjano4N08rc2VQbnpZVVY3TU1MeDkrOWE5Y2ZpVlMrNndoQWp6azVNVFlWN1l4Y1hGZkNVZUszS1gxT0ZiQWgyVzhQcjE2M21vTTc3RlNseUl3L1ZjY29jbExSNkJlL0hpeFcrUHd0Ry91SHkrQ1BHNEp4NnJjdUJtQWgzdUlDNjlyNnlzeklma25qeDVNditadTR2UVhnUjRoTGw3NG5CN0FoMTZFS3YzQ1BWWXVRdjRtMFZvdjN2M2J2NVhrK25RRDRFT0ExaXM0Q1BnWXplNStPdFVCK3BpOWYxMWdGdUJ3ekFFT294a0VmSlJzWXBmck9xemlKQmVoUGY3OSsvblA4Y1FtL0NHY1FoMEtDeENmUkgyRWZLeG9vKy9qNTlyVzlWSE9DK0cxajUrL0RnUDdVV0lHMTZEc2dRNlZPenJZUC82NTU5Ly92bTNmN2I0ei8zbzU2c3NnbmxoRWNhTHYwWllMLzR6aTlEKy9yOEQxRVdnQTBBQ1AzVUFRUE1FT2dBa0lOQUJJQUdCRGdBSkNIUUFTRUNnQTBBQ0FoMEFFaERvQUpDQVFBZUFCQVE2QUNRZzBBRWdBWUVPQUFrSWRBQklRS0FEUUFJQ0hRQVNFT2dBa0lCQUI0QUVCRG9BSkNEUUFTQUJnUTRBQ1FoMEFFaEFvQU5BQWdJZEFCSVE2QUNRZ0VBSGdBUUVPZ0FrSU5BQklBR0JEZ0FKQ0hRQVNFQ2dBMEFDQWgwQUVoRG9BSkNBUUFlQUJBUTZBQ1FnMEFFZ0FZRU9BQWtJZEFCSVFLQURRQUlDSFFBU0VPZ0FrSUJBQjRBRUJEb0FKQ0RRQVNBQmdRNEFDUWgwQUVoQW9BTkFBZ0lkQUJJUTZBQ1FnRUFIZ0FRRU9nQWtJTkFCSUFHQkRnQUpDSFFBU0VDZ0EwQUNBaDBBRWhEb0FKQ0FRQWVBQkFRNkFDUWcwQUVnQVlFT0FBa0lkQUJJUUtBRFFBSUNIUUFTRU9nQWtJQkFCNEFFQkRvQUpDRFFBU0FCZ1E0QUNRaDBBRWhBb0FOQUFnSWRBQklRNkFDUWdFQUhnQVFFT2dBa0lOQUJJQUdCRGdBSkNIUUFTRUNnQTBBQ0FoMEFFaERvQUpDQVFBZUFCQVE2QUNRZzBBRWdBWUVPQUFrSWRBQklRS0FEUUFJQ0hRQVNFT2dBa0lCQUI0QUUvaDhHYS9GdGtvTlFuUUFBQUFCSlJVNUVya0pnZ2c9PSIvPgo8L2RlZnM+Cjwvc3ZnPgo="
    style={{ borderRadius: "8px", width: "40px", height: "40px" }}
  ></img>
);

type SignedInProps = ComponentPropsWithRef<typeof Container>;
export const SignedIn = (props: SignedInProps) => {
  const { client } = useShieldContext();
  const { strategies = [] } = useStrategyContext();
  const clickHandler = useCallback(
    async (name: string) => {
      const {
        data: { endpoint },
      } = await client.getAuthStrategyEndpoint(name);
      window.location.href = endpoint;
    },
    [strategies]
  );

  const mailotp = strategies.find((s) => s.name === "mailotp");
  const filteredOIDC = strategies.filter((s) => s.name !== "mailotp");

  return (
    <Container {...props}>
      {mailotp && <MagicLink />}
      {mailotp && (
        <fieldset style={{ ...styles.fieldset, boxSizing: "border-box" }}>
          <legend style={styles.legend}>or</legend>
        </fieldset>
      )}
      {filteredOIDC.map((s, index) => {
        return (
          <OIDCButton key={index} onClick={() => clickHandler(s.name)}>
            {s.name}
          </OIDCButton>
        );
      })}
    </Container>
  );
};

type ContainerProps = ComponentPropsWithRef<"div"> & {
  children?: React.ReactNode;
  shadow?: "none" | "xs" | "sm" | "md" | "lg";
  radius?: "none" | "xs" | "sm" | "md" | "lg";
  title?: string;
  logo?: React.ReactNode;
};

export const Container = ({
  children,
  shadow = "sm",
  radius = "md",
  title = "Sign in",
  logo,
}: ContainerProps) => (
  <div
    style={{
      ...styles.container,
      flexDirection: "column",
      boxShadow: shadowOptions[shadow],
      borderRadius: borderRadiusOptions[radius],
    }}
  >
    <div style={styles.logoContainer}>{logo ? logo : defaultLogo}</div>
    <div style={styles.titleContainer}>{title}</div>
    {children}
  </div>
);
